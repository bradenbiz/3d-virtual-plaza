import { Component, HostListener, OnInit } from '@angular/core';

import * as THREE from 'three';
import {PointerLockControls} from 'three/examples/jsm/controls/PointerLockControls';

export enum KEY_CODE {
  UP_ARROW = 38,
  DOWN_ARROW = 40,
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}

@Component({
  selector: 'vapor-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.scss']
})
export class SandboxComponent {

  
}
