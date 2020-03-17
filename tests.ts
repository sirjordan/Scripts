import { AvailableForDirective } from './available-for.directive';
import { ElementRef, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CspSessionService } from '@link/csp-session';
import { User, Profile, UserSettings } from 'oidc-client';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from 'projects/csp-activity-search/src/lib/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('AvailableForDirective', () => {
  let nativeElement: Object;
  let elementRef: ElementRef;
  let directive: AvailableForDirective;
  let sessionServiceMock: CspSessionService;
  let currentUser: User;
  let profile: ProfileMock;
  let perm: Array<string>;

  beforeEach(() => {
    perm = ['Sender.Write', 'Sender.Delete'];
    profile = new ProfileMock();
    profile['perm'] = perm;

    currentUser = new User(new UserSettingsMock());
    currentUser.profile = profile;

    sessionServiceMock = new CspSessionService(null, null, null, null);
    sessionServiceMock.currentUser = currentUser;

    nativeElement = new Object();
    elementRef = new ElementRef(nativeElement);
    directive = new AvailableForDirective(elementRef, sessionServiceMock, null);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should greyout on active method call when NO perm', () => {

  });

  it('should not greyout on active method call when HAVE perm', () => {

  });

  it('should hide on visible method call when NO perm', () => {
    TestBed.configureTestingModule({
      declarations: [
        ActiveMethodButton,
        AvailableForDirective
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientTestingModule, MaterialModule, RouterTestingModule.withRoutes([])],
      providers: [
        { provide: CspSessionService, useValue: sessionServiceMock },
      ]
    })
      .compileComponents();

    let fixture = TestBed.createComponent(ActiveMethodButton);
    fixture.detectChanges();
    let inputEl = fixture.debugElement.query(By.css('button'));

    expect(inputEl.nativeElement.style.visibility).toBe('hidden')
  });

  it('should not hide on visible method call when HAVE perm', () => {

  });

  it('should hide on no method call when NO perm', () => {

  });

  it('should support case-insesetive', () => {

  });
});

@Component({
  template: `<button cspCommonAvailableFor [permisions]="['Sending.Edit', 'Sending.Delete']" method="active"></button>`,
})
class ActiveMethodButton { }


@Component({
  template: `<button cspCommonAvailableFor [permisions]="['Sending.Edit', 'Sending.Delete']" method="visible"></button>`,
})
class HiddenMethodButton { }

class UserSettingsMock implements UserSettings {
  id_token: string;
  session_state: string;
  access_token: string;
  refresh_token: string;
  token_type: string;
  scope: string;
  profile: Profile;
  expires_at: number;
  state: any;
}

class ProfileMock implements Profile {
  [claimKey: string]: any;
  iss: string;
  sub: string;
  aud: string;
  exp: number;
  iat: number;
  auth_time?: number;
  nonce?: number;
  at_hash?: string;
  acr?: string;
  amr?: string[];
  azp?: string;
  sid?: string;
  name?: string;
  given_name?: string;
  family_name?: string;
  middle_name?: string;
  nickname?: string;
  preferred_username?: string;
  profile?: string;
  picture?: string;
  website?: string;
  email?: string;
  email_verified?: boolean;
  gender?: string;
  birthdate?: string;
  zoneinfo?: string;
  locale?: string;
  phone_number?: string;
  phone_number_verified?: boolean;
  address?: import("oidc-client").OidcAddress;
  updated_at?: number;
}
