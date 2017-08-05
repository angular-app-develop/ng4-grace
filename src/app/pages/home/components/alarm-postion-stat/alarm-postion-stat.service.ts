import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Restangular } from 'ngx-restangular';
import { AuthenticationService } from '../../../../layout/services/authentication.service';

@Injectable()
export class AlarmPostionStatService {


  constructor(private http: Http, private restangular: Restangular, private authenticationService: AuthenticationService) { }


  private data = {
    "name": "IDC园区",
    "children": [{
      "name": "2号楼",
      "children": [{
        "name": "cluster",
        "children": [
          { "name": "AgglomerativeCluster", "size": 3938 },
          { "name": "CommunityStructure", "size": 3812 },
          { "name": "HierarchicalCluster", "size": 6714 },
          { "name": "MergeEdge", "size": 743 }
        ]
      },
      {
        "name": "graph",
        "children": [
          { "name": "BetweennessCentrality", "size": 3534 },
          { "name": "LinkDistance", "size": 5731 },
          { "name": "MaxFlowMinCut", "size": 7840 },
          { "name": "ShortestPaths", "size": 5914 },
          { "name": "SpanningTree", "size": 3416 }
        ]
      },
      {
        "name": "optimization",
        "children": [
          { "name": "AspectRatioBanker", "size": 7074 }
        ]
      }
      ]
    },
    {
      "name": "一号楼",
      "children": [
        { "name": "门禁设备", "size": 17010, "alarm": 2 },
        { "name": "红外设备", "size": 5842, "alarm": 1 },
        {
          "name": "3楼机房",
          "children": [
            { "name": "空调设备1", "size": 1983, "alarm": 2 },
            { "name": "ups电源1", "size": 2047, "alarm": 3 },
            { "name": "空调设备2", "size": 1375, "alarm": 1 },
            { "name": "ups电源2", "size": 8746, "alarm": 2 },
            { "name": "空调设备3", "size": 2202, "alarm": 3 },
            { "name": "ups电源3", "size": 1382, "alarm": 4 },
            { "name": "空调设备5", "size": 1629, "alarm": 2 },
            { "name": "电池", "size": 1675, "alarm": 1 },
            { "name": "水侵", "size": 2042, "alarm": 1 }
          ]
        },
        { "name": "一号红外", "size": 1041, "alarm": 2 },
        { "name": "图像设备3", "size": 5176, "alarm": 3 },
        { "name": "温度传感", "size": 449, "alarm": 4 },
        { "name": "3号红外", "size": 5593, "alarm": 1 },
        { "name": "3好图像设备", "size": 5534, "alarm": 2 },
        { "name": "烟感设备", "size": 9201, "alarm": 3 },
        { "name": "8号温度", "size": 19975, "alarm": 2 },
        { "name": "图像设备", "size": 1116, "alarm": 1 },
        { "name": "2号红外", "size": 6006, "alarm": 2 }
      ]
    },
    {
      "name": "3号楼",
      "children": [{
        "name": "converters",
        "children": [
          { "name": "Converters", "size": 721 },
          { "name": "DelimitedTextConverter", "size": 4294 },
          { "name": "GraphMLConverter", "size": 9800 },
          { "name": "JSONConverter", "size": 2220 }
        ]
      },
      { "name": "DataField", "size": 1759 },
      { "name": "DataSchema", "size": 2165 },
      { "name": "DataSet", "size": 586 },
      { "name": "DataSource", "size": 3331 },
      { "name": "DataTable", "size": 772 },
      { "name": "DataUtil", "size": 3322 }
      ]
    },
    {
      "name": "4号楼",
      "children": [
        { "name": "DirtySprite", "size": 8833 },
        { "name": "LineSprite", "size": 1732 },
        { "name": "RectSprite", "size": 3623 },
        { "name": "TextSprite", "size": 10066 }
      ]
    },
    {
      "name": "办公楼",
      "children": [
        { "name": "FlareVis", "size": 4116, alarm: 2 },
        { "name": "IDataConverter", "size": 1314 },
      ]
    },
    {
      "name": "6号楼",
      "children": [
        { "name": "DragForce", "size": 1082 },
        { "name": "GravityForce", "size": 1336 },
        { "name": "IForce", "size": 319 },
        { "name": "NBodyForce", "size": 10498 },
        { "name": "Particle", "size": 2822 },
        { "name": "Simulation", "size": 9983 },
        { "name": "Spring", "size": 2213 },
        { "name": "SpringForce", "size": 1681 }
      ]
    },
    {
      "name": "7号楼",
      "children": [
        { "name": "AggregateExpression", "size": 1616 },
        { "name": "And", "size": 1027 },
        { "name": "Arithmetic", "size": 3891 },
        { "name": "Average", "size": 891 },
        { "name": "BinaryExpression", "size": 2893 },
        { "name": "Comparison", "size": 5103 },
        { "name": "CompositeExpression", "size": 3677 },
        { "name": "Count", "size": 781 },
        { "name": "DateUtil", "size": 4141 },
        { "name": "Distinct", "size": 933 },
        { "name": "Expression", "size": 5130 },
        { "name": "ExpressionIterator", "size": 3617 },
        { "name": "Fn", "size": 3240 },
        { "name": "If", "size": 2732 },
        { "name": "IsA", "size": 2039 },
        { "name": "Literal", "size": 1214 },
        { "name": "Match", "size": 3748 },
        { "name": "Maximum", "size": 843 },
        {
          "name": "methods",
          "children": [
            { "name": "add", "size": 593 },
            { "name": "and", "size": 330 },
            { "name": "average", "size": 287 },
            { "name": "count", "size": 277 },
            { "name": "distinct", "size": 292 },
            { "name": "div", "size": 595 },
            { "name": "eq", "size": 594 },
            { "name": "fn", "size": 460 },
            { "name": "gt", "size": 603 },
            { "name": "gte", "size": 625 },
            { "name": "iff", "size": 748 },
            { "name": "isa", "size": 461 },
            { "name": "lt", "size": 597 },
            { "name": "lte", "size": 619 },
            { "name": "max", "size": 283 },
            { "name": "min", "size": 283 },
            { "name": "mod", "size": 591 },
            { "name": "mul", "size": 603 },
            { "name": "neq", "size": 599 },
            { "name": "not", "size": 386 },
            { "name": "or", "size": 323 },
            { "name": "orderby", "size": 307 },
            { "name": "range", "size": 772 },
            { "name": "select", "size": 296 },
            { "name": "stddev", "size": 363 },
            { "name": "sub", "size": 600 },
            { "name": "sum", "size": 280 },
            { "name": "update", "size": 307 },
            { "name": "variance", "size": 335 },
            { "name": "where", "size": 299 },
            { "name": "xor", "size": 354 },
            { "name": "_", "size": 264 }
          ]
        },
        { "name": "Minimum", "size": 843 },
        { "name": "Not", "size": 1554 },
        { "name": "Or", "size": 970 },
        { "name": "Query", "size": 13896 },
        { "name": "Range", "size": 1594 },
        { "name": "StringUtil", "size": 4130 },
        { "name": "Sum", "size": 791 },
        { "name": "Variable", "size": 1124 },
        { "name": "Variance", "size": 1876 },
        { "name": "Xor", "size": 1101 }
      ]
    },
    {
      "name": "8号楼",
      "children": [
        { "name": "IScaleMap", "size": 2105 },
        { "name": "LinearScale", "size": 1316 },
        { "name": "LogScale", "size": 3151 },
        { "name": "OrdinalScale", "size": 3770 },
        { "name": "QuantileScale", "size": 2435 },
        { "name": "QuantitativeScale", "size": 4839 },
        { "name": "RootScale", "size": 1756 },
        { "name": "Scale", "size": 4268 },
        { "name": "ScaleType", "size": 1821 },
        { "name": "TimeScale", "size": 5833 }
      ]
    },
    {
      "name": "9号楼",
      "children": [
        { "name": "Arrays", "size": 8258 },
        { "name": "Colors", "size": 10001 },
        { "name": "Dates", "size": 8217 },
        { "name": "Displays", "size": 12555 },
        { "name": "Filter", "size": 2324 },
        { "name": "Geometry", "size": 10993 },
        {
          "name": "heap",
          "children": [
            { "name": "FibonacciHeap", "size": 9354 },
            { "name": "HeapNode", "size": 1233 }
          ]
        },
        { "name": "IEvaluable", "size": 335 },
        { "name": "IPredicate", "size": 383 },
        { "name": "IValueProxy", "size": 874 },
        {
          "name": "math",
          "children": [
            { "name": "DenseMatrix", "size": 3165 },
            { "name": "IMatrix", "size": 2815 },
            { "name": "SparseMatrix", "size": 3366 }
          ]
        },
        { "name": "Maths", "size": 17705 },
        { "name": "Orientation", "size": 1486 },
        {
          "name": "palette",
          "children": [
            { "name": "ColorPalette", "size": 6367 },
            { "name": "Palette", "size": 1229 },
            { "name": "ShapePalette", "size": 2059 },
            { "name": "SizePalette", "size": 2291 }
          ]
        },
        { "name": "Property", "size": 5559 },
        { "name": "Shapes", "size": 19118 },
        { "name": "Sort", "size": 6887 },
        { "name": "Stats", "size": 6557 },
        { "name": "Strings", "size": 22026 }
      ]
    },
    {
      "name": "10号楼",
      "children": [{
        "name": "一层",
        "children": [
          { "name": "Axes", "size": 1302 },
          { "name": "Axis", "size": 24593 },
          { "name": "AxisGridLine", "size": 652 },
          { "name": "AxisLabel", "size": 636 },
          { "name": "CartesianAxes", "size": 6703 }
        ]
      },
      {
        "name": "二层",
        "children": [
          { "name": "AnchorControl", "size": 2138 },
          { "name": "ClickControl", "size": 3824 },
          { "name": "Control", "size": 1353 },
          { "name": "ControlList", "size": 4665 },
          { "name": "DragControl", "size": 2649 },
          { "name": "ExpandControl", "size": 2832 },
          { "name": "HoverControl", "size": 4896 },
          { "name": "IControl", "size": 763 },
          { "name": "PanZoomControl", "size": 5222 },
          { "name": "SelectionControl", "size": 7862 },
          { "name": "TooltipControl", "size": 8435 }
        ]
      },
      {
        "name": "三层",
        "children": [
          { "name": "Data", "size": 20544 },
          { "name": "DataList", "size": 19788 },
          { "name": "DataSprite", "size": 10349 },
          { "name": "EdgeSprite", "size": 3301 },
          { "name": "NodeSprite", "size": 19382 },
          {
            "name": "render",
            "children": [
              { "name": "ArrowType", "size": 698 },
              { "name": "EdgeRenderer", "size": 5569 },
              { "name": "IRenderer", "size": 353 },
              { "name": "ShapeRenderer", "size": 2247 }
            ]
          },
          { "name": "ScaleBinding", "size": 11275 },
          { "name": "Tree", "size": 7147 },
          { "name": "TreeBuilder", "size": 9930 }
        ]
      },
      {
        "name": "4层",
        "children": [
          { "name": "DataEvent", "size": 2313 },
          { "name": "SelectionEvent", "size": 1880 },
          { "name": "TooltipEvent", "size": 1701 },
          { "name": "VisualizationEvent", "size": 1117 }
        ]
      },
      {
        "name": "5层",
        "children": [
          { "name": "Legend", "size": 20859 },
          { "name": "LegendItem", "size": 4614 },
          { "name": "LegendRange", "size": 10530 }
        ]
      },
      {
        "name": "6层",
        "children": [{
          "name": "空调房",
          "children": [
            { "name": "BifocalDistortion", "size": 4461 },
            { "name": "Distortion", "size": 6314 },
            { "name": "FisheyeDistortion", "size": 3444 }
          ]
        },
        {
          "name": "电源机房",
          "children": [
            { "name": "ColorEncoder", "size": 3179 },
            { "name": "Encoder", "size": 4060 },
            { "name": "PropertyEncoder", "size": 4138 },
            { "name": "ShapeEncoder", "size": 1690 },
            { "name": "SizeEncoder", "size": 1830 }
          ]
        },
        {
          "name": "通讯机房",
          "children": [
            { "name": "FisheyeTreeFilter", "size": 5219 },
            { "name": "GraphDistanceFilter", "size": 3165 },
            { "name": "VisibilityFilter", "size": 3509 }
          ]
        },
        { "name": "测试", "size": 1286 },
        {
          "name": "电池室",
          "children": [
            { "name": "Labeler", "size": 9956 },
            { "name": "RadialLabeler", "size": 3899 },
            { "name": "StackedAreaLabeler", "size": 3202 }
          ]
        },
        {
          "name": "值班室",
          "children": [
            { "name": "门禁设备", "size": 17010, "alarm": 2 },
            { "name": "红外设备", "size": 5842, "alarm": 1 },
            { "name": "一号红外", "size": 1041, "alarm": 2 },
            { "name": "图像设备3", "size": 5176, "alarm": 3 },
            { "name": "温度传感", "size": 449, "alarm": 4 },
            { "name": "3号红外", "size": 5593, "alarm": 1 },
            { "name": "3好图像设备", "size": 5534, "alarm": 2 },
            { "name": "烟感设备", "size": 9201, "alarm": 3 },
            { "name": "8号温度", "size": 19975, "alarm": 2 },
            { "name": "图像设备", "size": 1116, "alarm": 1 },
            { "name": "2号红外", "size": 6006, "alarm": 2 }
          ]
        },
        { "name": "烟感设备", "size": 2490 },
        { "name": "温度传感器", "size": 5248 },
        { "name": "红外传感器", "size": 4190 },
        { "name": "水侵设备", "size": 2581 },
        { "name": "门禁", "size": 2023 }
        ]
      },
      { "name": "Visualization", "size": 16540 }
      ]
    }
    ]
  };

  public getData() {
    return this.data;
  }

  public getOverViewData(): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8', 'Authorization': 'Bearer ' + this.authenticationService.getToken() });
    let options = new RequestOptions({ headers: headers }); 
    return this.http.get('api/overview/alarmpositionoverview', options).map((res: Response) => res.json());
  }
}
