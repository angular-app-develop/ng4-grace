import { Component, ElementRef, NgZone, OnInit, OnDestroy } from '@angular/core';
// import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import d3Tip from 'd3-tip';
import {
  D3Service,
  D3,
  Axis,
  BrushBehavior,
  BrushSelection,
  D3BrushEvent,
  ScaleLinear,
  ScaleOrdinal,
  Selection,
  Transition
} from 'd3-ng2-service';
import { AlarmPostionStatService } from './alarm-postion-stat.service';

@Component({
  selector: 'alarm-postion-stat',
  templateUrl: './alarm-postion-stat.component.html',
  styleUrls: ['./alarm-postion-stat.component.scss']
})
export class AlarmPostionStatComponent
  implements OnInit, OnDestroy {

  private d3: D3;
  private parentNativeElement: any;
  private d3Svg: Selection<SVGSVGElement, any, null, undefined>;
  private data: any;

  constructor(public router: Router,
    public activatedRoute: ActivatedRoute, element: ElementRef, private ngZone: NgZone, d3Service: D3Service, alarmPostionStatService: AlarmPostionStatService) {

    //this.data = _alarmPostionStatService.getData();
    alarmPostionStatService.getOverViewData().subscribe(
      (sdata) => {
        this.data = sdata[0];
        this.startShow();
      }
    );
    this.d3 = d3Service.getD3();
    this.parentNativeElement = element.nativeElement;
  }

  ngOnDestroy() {
    if (this.d3Svg.empty && !this.d3Svg.empty()) {
      this.d3Svg.selectAll('*').remove();
    }
  };
  ngOnInit() { };

  goDeviceDetail(currentNode): void {
    let nodePath = this.generatePath(currentNode, "");
    this.router.navigate(['/pages/monitor/device'], {
      queryParams: {
        deviceId: currentNode["data"].id,
        path: nodePath,
        name: currentNode["data"].name
      }
    });
  }

  generatePath(node, path): string {
    if (node["parent"]) {
      path = node["parent"]["data"].name + ">" + path;
      return this.generatePath(node["parent"], path);
    }
    else
      return path.substr(0,path.length-1);
  }

  startShow() {
    let self = this;
    let d3 = this.d3;
    let d3ParentElement: Selection<HTMLElement, any, null, undefined>;
    let d3Svg: Selection<SVGSVGElement, any, null, undefined>;
    let d3G: Selection<SVGGElement, any, null, undefined>;
    let margin = 20;
    let diameter: number;
    let color;
    let pack;
    let root;

    d3ParentElement = d3.select(this.parentNativeElement);
    d3Svg = this.d3Svg = d3ParentElement.select<SVGSVGElement>('svg');
    diameter = +d3Svg.attr("width");
    d3G = d3Svg.append<SVGGElement>("g").attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");
    color = d3.scaleLinear<string>()
      .domain([-1, 5])
      .range(["hsla(152,80%,80%,1)", "hsla(228,30%,40%,1)"])
      .interpolate(d3.interpolateHcl);
    pack = d3.pack()
      .size([diameter - margin, diameter - margin])
      .padding(2);

    const tip = d3Tip()
      .attr('class', 'd3-tip')
      // .offset([-10, 0])
      .html(function (d) {
        if (!d["children"])
          return "<strong>Frequency:</strong> <span style='color:red'>" + d["data"].name + "</span>";
      })
      .direction('nw')
      .offset([0, 3])

    d3Svg.call(tip);
    if (!this.data)
        return;
    root = d3.hierarchy(this.data)
      .sum(function (d) { return d.size; })
      .sort(function (a, b) { return b.value - a.value; });

    var focus = root,
      nodes = pack(root).descendants(),
      view;

    var circle = d3G.selectAll<SVGCircleElement,
      any>('circle')
      .data(nodes)
      .enter().append<SVGCircleElement>('circle')
      .attr("class", function (d) {
        if (!d["parent"])
          return "node node--root";
        else if (!d["children"]) {
          if (d["data"].alarm) {
            if (d["data"].alarm == 1)
              return "node node--alarm1";
            if (d["data"].alarm == 2)
              return "node node--alarm2";
            if (d["data"].alarm == 3)
              return "node node--alarm3";
            if (d["data"].alarm == 4)
              return "node node--alarm4";
          }
          return "node node--leaf";
        } else return "node";
      })
      .style("fill", function (d) { return d["children"] ? color(d["depth"]) : null; })
      .on("click", function (d) {
        if (focus !== d) { zoom(d), d3.event.stopPropagation(); return; }
        if (d === focus && !d["children"])
          self.goDeviceDetail(d);
      });
    // .on('mouseout', tip.hide )
    // .on("mouseover", tip.show );


    var text = d3G.selectAll("text")
      .data(nodes)
      .enter().append("text")
      .attr("class", "label")
      .style("fill-opacity", function (d) { return d["parent"] === root ? 1 : 0; })
      .style("display", function (d) { return d["parent"] === root ? "inline" : "none"; })
      .text(function (d) { return d["data"].name; });

    var node = d3G.selectAll("circle,text");

    d3Svg.style("background", "rgba(0,0,0,0)")
      .on("click", function () { zoom(root); });

    zoomTo([root.x, root.y, root.r * 2 + margin]);

    function zoom(d) {
      var focus0 = focus;
      focus = d;

      //let t: Transition<SVGSVGElement, any, null, undefined> = d3Svg.transition().duration(d3.event.altKey ? 7500 : 750);
      var transition = d3Svg.transition()
        .duration(d3.event.altKey ? 7500 : 750)
        .tween("zoom", function (d) {
          var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
          return function (t) { zoomTo(i(t)); };
        });

      transition.selectAll("text")
        .filter(function (d) {
          return d["parent"] === focus || this["style"].display === "inline" || d === focus;
        })
        .style("fill-opacity", function (d) {
          return d !== focus ? d["parent"] === focus ? 1 : 0 : 1;
        })
        .on("start", function (d) {
          if (d["parent"] === focus || d === focus)
            this["style"].display = "inline";
        })
        .on("end", function (d) {
          if (d["parent"] !== focus && d !== focus)
            this["style"].display = "none";
          if (d === focus && d["children"])
            this["style"].display = "none";
        });
    }

    function zoomTo(v) {
      var k = diameter / v[2];
      view = v;
      node.attr("transform", function (d) { return "translate(" + (d["x"] - v[0]) * k + "," + (d["y"] - v[1]) * k + ")"; });
      circle.attr("r", function (d) { return d["r"] * k; });
    }
  }
}
