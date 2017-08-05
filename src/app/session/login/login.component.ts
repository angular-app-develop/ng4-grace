import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '@layout/services/authentication.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from '@services/common/toast.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public user: AbstractControl;
  public password: AbstractControl;
  public lang: AbstractControl;
  public submitted: Boolean = false;
  public message: String = '';
  public welcome:  String = '';

  constructor(public router: Router,
    public activatedRoute: ActivatedRoute, fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private translate: TranslateService,
    private toastService: ToastService) {
    this.form = fb.group({
      'user': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'lang': ['', Validators.compose([Validators.required])]
    });

    this.user = this.form.controls['user'];
    this.password = this.form.controls['password'];
    this.lang = this.form.controls['lang'];
  }

  ngOnInit() {
    if (localStorage.langKey) {
      const lang = localStorage.langKey;
      this.translate.use(lang);
      if (lang === 'zh') {
        this.form.patchValue({ lang: 'zh' });
      } else {
        this.form.patchValue({ lang: 'en' });
      }
      this.getTranslateMessage();
    }
  }

  public onSubmit(values: Object): void {
    this.submitted = true;
    if (this.form.valid) {
      this.authenticationService.login(this.user.value, this.password.value).subscribe((res) => {
        console.log(res);
        if (res && res.length === 1 && res[0].LogonId && res[0].token) {
          localStorage.setItem('usertoken', res[0].token);
          localStorage.setItem('username', this.user.value);
          this.router.navigateByUrl('pages/home');
          this.toastService.showToast('success', this.welcome + '  ' + this.user.value, '');
        } else if (res && res.length === 1 && res[0].error) {
          this.message = res[0].error;
          this.toastService.showToast('warning', this.message, '');
        } else {
          this.message = 'login failed';
          this.toastService.showToast('error', this.message, '');
        }
      }, (res) => {
        this.message = 'user name or password is not corrected.admin/adminadmin is the default.';
      });
    }
  }

  public onChange(value): void {
    localStorage.setItem('langKey', value);
    if ('en' === value) {
      this.translate.use(localStorage.langKey);
    } else {
      this.translate.use(localStorage.langKey);
    }
  }

  getTranslateMessage() {
    this.translate.get(['general.login.welcome']).subscribe(res => {
      this.welcome = res['general.login.welcome'];
    });
  }
}
