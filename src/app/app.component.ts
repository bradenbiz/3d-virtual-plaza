import {Component, HostListener, OnInit} from '@angular/core';
import * as THREE from 'three';
import {PointerLockControls} from 'three/examples/jsm/controls/PointerLockControls';

@Component({
  selector: 'vapor-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public hasClicked: boolean = false;
  public isMenuClosed: boolean = true;
  public canLock: boolean = true;


  private camera;
  private scene;
  private renderer;
  private controls;

  private objects = [];

  private raycaster;

  private moveForward = false;
  private moveBackward = false;
  private moveLeft = false;
  private moveRight = false;
  private canJump = false;
  private isSprinting = false;
  private isShifting = false;

  private prevTime = performance.now();
  private velocity = new THREE.Vector3();
  private direction = new THREE.Vector3();
  private vertex = new THREE.Vector3();
  private color = new THREE.Color();




  constructor() { }

  ngOnInit() {
    this.init();
    this.animate();
    this.ghostCursor();
  }

  private ghostCursor() {
    let element = document.body
  
    let width = window.innerWidth
    let height = window.innerHeight
    let cursor = { x: width / 2, y: width / 2 }
    let particles = []
    let canvas, context
  
    let baseImage = new Image()
    baseImage.src =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAATCAYAAACk9eypAAAAAXNSR0IArs4c6QAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAhGVYSWZNTQAqAAAACAAFARIAAwAAAAEAAQAAARoABQAAAAEAAABKARsABQAAAAEAAABSASgAAwAAAAEAAgAAh2kABAAAAAEAAABaAAAAAAAAAEgAAAABAAAASAAAAAEAA6ABAAMAAAABAAEAAKACAAQAAAABAAAADKADAAQAAAABAAAAEwAAAAAChpcNAAAACXBIWXMAAAsTAAALEwEAmpwYAAABWWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgpMwidZAAABqElEQVQoFY3SPUvDQBgH8BREpRHExYiDgmLFl6WC+AYmWeyLg4i7buJX8DMpOujgyxGvUYeCgzhUQUSKKLUS0+ZyptXh8Z5Ti621ekPyJHl+uftfomhaf9Ei5JyxXKfynyEA6EYcLHpwyflT958GAQ7DTABNHd8EbtDbEH2BD5QEQmi2mM8P/Iq+A0SzszEg+3sPjDnDdVEtQKQbMUidHD3xVzf6A9UDEmEm+8h9KTqTVUjT+vB53aHrCbAPiceYq1dQI1Aqv4EhMll0jzv+Y0yiRgCnLRSYyDQHVoqUXe4uKL9l+L7GXC4vkMhE6eW/AOJs9k583ORDUyXMZ8F5SVHVVnllmPNKSFagAJ5DofaqGXw/gHBYg51dIldkmknY3tguv3jOtHR4+MqAzaraJXbEhqHhcQlwGSOi5pytVQHZLN5s0WNe8HPrLYlFsO20RPHkImxsbmHdLJFI76th7Z4SeuF53hTeFLvhRCJRCTKZKxgdnRDbW+iozFJbBMw14/ElwGYc0egMBMFzT21f5Rog33Z7dX02GBm7WV5ZfT5Nn5bE3zuCDe9UxdTpNvK+5AAAAABJRU5ErkJggg=="
  
    function init() {
      canvas = document.createElement("canvas")
      canvas.id = 'ghost-pointer-canvas';
      context = canvas.getContext("2d");
      canvas.style.zIndex = "1003";
      canvas.style.top = "0px"
      canvas.style.left = "0px"
      canvas.style.pointerEvents = "none"
  
      canvas.style.position = "fixed"
      document.body.appendChild(canvas)
      canvas.width = width
      canvas.height = height
  
      bindEvents()
      loop()
    }
  
    // Bind events that are needed
    function bindEvents() {
      element.addEventListener("mousemove", onMouseMove)
      element.addEventListener("touchmove", onTouchMove)
      element.addEventListener("touchstart", onTouchMove)
      window.addEventListener("resize", onWindowResize2)
    }
  
    function onWindowResize2(e) {
      width = window.innerWidth
      height = window.innerHeight
  
      canvas.width = width
      canvas.height = height
    }
  
    function onTouchMove(e) {
      if (e.touches.length > 0) {
        for (let i = 0; i < e.touches.length; i++) {
          addParticle(e.touches[i].clientX, e.touches[i].clientY, baseImage)
        }
      }
    }
  
    function onMouseMove(e) {
      cursor.x = e.clientX
      cursor.y = e.clientY
  
      addParticle(cursor.x, cursor.y, baseImage)
    }
  
    function addParticle(x, y, image) {
      particles.push(new Particle(x, y, image))
    }
  
    function updateParticles() {
      context.clearRect(0, 0, width, height)
  
      // Update
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(context)
      }
  
      // Remove dead particles
      for (let i = particles.length - 1; i >= 0; i--) {
        if (particles[i].lifeSpan < 0) {
          particles.splice(i, 1)
        }
      }
    }
  
    function loop() {
      updateParticles()
      requestAnimationFrame(loop)
    }
  
    /**
     * Particles
     */
  
    function Particle(x, y, image) {
      const lifeSpan = 40
      this.initialLifeSpan = lifeSpan //ms
      this.lifeSpan = lifeSpan //ms
      this.position = { x: x, y: y }
  
      this.image = image
  
      this.update = function(context) {
        this.lifeSpan--
        const opacity = Math.max(this.lifeSpan / this.initialLifeSpan, 0)
  
        context.globalAlpha = opacity
        context.drawImage(
          this.image,
          this.position.x, // - (this.canv.width / 2) * scale,
          this.position.y //- this.canv.height / 2,
        )
      }
    }
  
    init()
  }

  @HostListener('click', ['$event'])
  toggle() {
    if (this.canLock) {
      this.controls.lock();
      this.hasClicked = true;
      document.getElementById("ghost-pointer-canvas").style.display = 'none';
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyDownEvent(event: KeyboardEvent) {
    switch ( event.key ) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        this.moveForward = false;
        this.isSprinting = false;
        break;

      case 'ArrowLeft':
      case 'a':
        this.moveLeft = false;
        break;

      case 'ArrowDown':
      case 's':
        this.moveBackward = false;
        break;

      case 'Shift':
        this.isShifting = false;
        this.isSprinting = false;
        break;

      case 'ArrowRight':
      case 'd':
        this.moveRight = false;
        break;
    }
  }

  @HostListener('window:keydown', ['$event'])
  keyUpEvent(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        this.moveForward = true;
        if (this.isShifting) {
          this.isSprinting = true;
        }
        break;

      case 'ArrowLeft':
      case 'a':
        this.moveLeft = true;
        break;

      case 'ArrowDown':
      case 's':
        this.moveBackward = true;
        break;

      case 'ArrowRight':
      case 'd':
        this.moveRight = true;
        break;

      case 'Shift':
        this.isShifting = true;
        if (this.moveForward === true) {
          this.isSprinting = true;
        }
        break;

      case ' ':
        if (this.canJump === true) {
          this.velocity.y += 275;
        }
        this.canJump = false;
        break;
    }
  }

  private init(): void {

    // setup camera
    this.camera = new THREE.PerspectiveCamera( 75, (window.innerHeight * (4/3)) / window.innerHeight, .1, 1500 );
    this.camera.position.y = 10;

    // setup scene & light
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xF7996E);
    this.scene.fog = new THREE.Fog(0xB89FA5, 0, 1000);

    const light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
    light.position.set( 0.5, 1, 0.75 );
    this.scene.add( light );

    // setup controls
    this.controls = new PointerLockControls( this.camera, document.body );

    this.controls.addEventListener('lock', () => {
      this.isMenuClosed = true;
    });

    this.controls.addEventListener('unlock', () => {
      this.isMenuClosed = false;
      document.getElementById("ghost-pointer-canvas").style.display = '';
      if (this.hasClicked) {
        this.canLock = false;
        setTimeout(() => {
          this.canLock = true;
        }, 1500);
      }
    });

    this.scene.add( this.controls.getObject() );

    this.raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );

    // floor

    let floorGeometry = new THREE.PlaneGeometry( 2000, 1000, 100, 100 );
    floorGeometry.rotateX( - Math.PI / 2 );

    // vertex displacement

    let position = floorGeometry.attributes.position;

    for ( let i = 0, l = position.count; i < l; i ++ ) {

      this.vertex.fromBufferAttribute( position, i );

      this.vertex.x += Math.random() * 20 - 10;
      this.vertex.y += Math.random() * 2;
      this.vertex.z += Math.random() * 20 - 10;

      position.setXYZ( i, this.vertex.x, this.vertex.y, this.vertex.z );

    }

    floorGeometry = floorGeometry.toNonIndexed(); // ensure each face has unique vertices

    position = floorGeometry.attributes.position;
    const colorsFloor = [];

    for ( let i = 0, l = position.count; i < l; i ++ ) {

      this.color.setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
      colorsFloor.push( this.color.r, this.color.g, this.color.b );

    }

    floorGeometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colorsFloor, 3 ) );

    const floorMaterial = new THREE.MeshBasicMaterial( { vertexColors: true } );

    const floor = new THREE.Mesh( floorGeometry, floorMaterial );
    this.scene.add( floor );

    // objects

    const boxGeometry = new THREE.BoxGeometry( 20, 20, 20 ).toNonIndexed();

    position = boxGeometry.attributes.position;
    const colorsBox = [];

    for ( let i = 0, l = position.count; i < l; i ++ ) {

      this.color.setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
      colorsBox.push( this.color.r, this.color.g, this.color.b );

    }

    // boxGeometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colorsBox, 3 ) );

    const loader = new THREE.FontLoader();
    loader.load( '../assets/fonts/Fira_Mono/FiraMono-Regular.json', (font) => {
      var whatsUpTextGeometry = new THREE.TextGeometry('whats up!', {
        font: font,
        size: 10,
        height: 1,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: .1,
        bevelSize: .1,
        bevelOffset: 0,
        bevelSegments: 5
      });
      const yo = new THREE.MeshBasicMaterial({color: 0x392F5A, wireframe: true});
      var text = new THREE.Mesh(whatsUpTextGeometry, yo);
      text.position.x = 10;
      text.position.y = 10;
      text.position.z = 10;
      this.scene.add(text);
    });

    for ( let i = 0; i < 500; i ++ ) {

      const boxMaterial = new THREE.MeshBasicMaterial( { color: 0x8AAF5F, linewidth: 2 } );
      // boxMaterial.color.setHSL( Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );

      const box = new THREE.Mesh( boxGeometry, boxMaterial );
      box.position.x = Math.floor( Math.random() * 20 - 10 ) * 20;
      box.position.y = Math.floor( Math.random() * 20 ) * 20 + 10;
      box.position.z = Math.floor( Math.random() * 20 - 10 ) * 20;

      this.scene.add( box );
      this.objects.push( box );

    }

    this.renderer = new THREE.WebGLRenderer( { antialias: false } );
    this.renderer.setPixelRatio(window.devicePixelRatio/4);
    this.renderer.setSize((window.innerHeight * (4/3)), window.innerHeight);
    this.renderer.domElement.style.margin = '0 auto';
    document.body.appendChild(this.renderer.domElement);

    window.addEventListener('resize', this.onWindowResize);

  }

  private onWindowResize(): void {

    this.camera.aspect = window.innerHeight * (4/3) / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize((window.innerHeight * (4/3)), window.innerHeight);
  }

  private animate = () => {

    setTimeout(() => {
      requestAnimationFrame(this.animate);
    }, (1000/30));


    const time = performance.now();

    if ( this.controls.isLocked === true ) {

      this.raycaster.ray.origin.copy( this.controls.getObject().position );
      this.raycaster.ray.origin.y -= 10;


      const intersections = this.raycaster.intersectObjects( this.objects );

      const onObject = intersections.length > 0;

      const delta = (time - this.prevTime) / 1000;

      this.velocity.x -= this.velocity.x * 10.0 * delta;
      this.velocity.z -= this.velocity.z * 10.0 * delta;

      this.velocity.y -= 9.8 * 90.0 * delta; // 90.0 = mass

      this.direction.z = Number( this.moveForward ) - Number( this.moveBackward );
      this.direction.x = Number( this.moveRight ) - Number( this.moveLeft );
      this.direction.normalize(); // this ensures consistent movements in all directions

      if (this.moveForward || this.moveBackward) {
        this.velocity.z -= this.direction.z * 400.0 * delta;
      }
      if (this.moveLeft || this.moveRight) {
        this.velocity.x -= this.direction.x * 400.0 * delta;
      }

      if (onObject === true) {
        this.velocity.y = Math.max( 0, this.velocity.y );
        this.canJump = true;
      }

      this.controls.moveRight( - this.velocity.x * delta );
      this.controls.moveForward( - this.velocity.z * delta + (Number(this.isSprinting) * 0.75));

      this.controls.getObject().position.y += ( this.velocity.y * delta ); // new behavior

      if (this.controls.getObject().position.y < 10) {

        this.velocity.y = 0;
        this.controls.getObject().position.y = 10;

        this.canJump = true;

      }

    }

    this.prevTime = time;

    this.renderer.render(this.scene, this.camera);

  }
}
