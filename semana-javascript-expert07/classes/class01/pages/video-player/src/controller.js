export default class Controller {
 #view
 #camera
 #worker
 #blinkCounter = 0
 constructor({ view, worker, camera }){
  this.#view = view
  this.#camera = camera
  this.#worker = this.#configureWorker(worker)
   
  this.#view.configureOnBtnClick(this.onBtnStart.bind(this))
 }
 static async initialize(deps) {
    const controller = new Controller(deps)
    controller.log('Not yet detecting eye blink! click in the button to start')
    return controller.init()
 }
 #configureWorker(worker) {
   let ready = false
   worker.onmessage = (msg) => {
     if('READY' === msg.data) {
      console.log('Worker is ready!')
      this.#view.enableButton()
      ready = true
      return;
     }
     const blinked = data.blinked
     this.#blinkCounter += blinked
     console.log('blinked', blikend)
   }
   return {
     send (msg) {
       if(!ready) return;
       worker.postMessage(msg)
     }
   }
 }

 async init() {
   console.log('init!!') 
 }
 loop (){
   const video = this.#camera.video
   const img = this.#view.getVideoFrame(video)
   this.#worker.send(img)
   this.log(`detecting eye blink..`)

   setTimeout(() => this.loop, 100);

 }
 log(text) {
   this.#view.log(`logger: ${text}`)
 }
 onBtnStart(){
   this.log('initializing detection...')
   this.#blinkCounter = 0
   this.loop()
 }
}