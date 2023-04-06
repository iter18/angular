import { Component,Input  } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html'
})
export class ModalsComponent {
  @Input() template: string = "";
  @Input() image: string = "";
  @Input() text: string="";
  @Input() isbn: string="";
  @Input() titulo: string="";
  @Input() categoria: string="";
  @Input() editorial: string="";
  @Input() autor: string="";
  @Input() inputs: any;
  safeImageUrl: SafeUrl ="";;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnChanges() {
    if (this.template === 'image' && this.image) {
      this.safeImageUrl = this.sanitizer.bypassSecurityTrustUrl(this.image);
    }
  }

  closeModal() {
    $('#myModal').modal('hide');
  }

}
