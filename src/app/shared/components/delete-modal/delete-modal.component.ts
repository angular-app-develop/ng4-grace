import { Component, OnInit } from '@angular/core'; 
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; 

@Component({
  selector: 'add-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DelModalComponent implements OnInit {
  title: string;
  content: string;

  constructor(private ngModal: NgbActiveModal) {
  }

  ngOnInit() {
    this.title = "删除";
  }

  submit() {
    this.ngModal.close("ok");
  }

  close() {
    this.ngModal.close("cancel");
  }

}
