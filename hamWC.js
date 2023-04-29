//Slot,slot,name

const template=document.createElement('template')
template.innerHTML=`
<style> 
div {
    width: 40px;
    height: 40px;
    padding: 0.5em;
    display:inline;
}
@keyframes plus45 {
    0% {
        transform-origin: 0%;
        transform: rotate(0deg);
    }

    100% {
        transform-origin: 25%;
        transform: rotate(45deg);
    }
}
@keyframes minus45 {
    0% {
        transform-origin: 0%;
        transform: rotate(0deg);
    }
    100% {
        transform-origin: 25%;
        transform: rotate(-45deg);
    }
}
@keyframes hide {
    0% {
        opacity:1
    }
    100% {
        opacity:0
    }
}

.none{
    display:none
}
.line-1 {
    animation: plus45 0.1s ease-out forwards;
}
.line-3 {
    animation: minus45 0.2s ease-out forwards;
}
.line-2 {
    animation:hide 0.2s ease-out forwards;
}
.line-4 {
    animation: plus45 0.2s ease-out forwards reverse;
}
.line-6 {
    animation: minus45 0.2s ease-out forwards reverse;
}
.line-5 {
    animation:hide 0.2s ease-out forwards reverse;
}
</style>

<div>
       
    <svg id="open" height="40" width="40">
        <line id="top" x1="5" y1="10" x2="35" y2="10" stroke="rgb(150, 48, 99)" stroke-width="2"></line>
        <line id="mid" x1="5" y1="20" x2="35" y2="20" stroke="rgb(150, 48, 99)" stroke-width="2"></line>
        <line id="bottom" x1="5" y1="30" x2="35" y2="30" stroke="rgb(150, 48, 99)" stroke-width="2"></line>
    </svg>
    <svg id="close" class="none" height="40" width="40">
        <line id="up" x1="5" y1="10" x2="35" y2="10" stroke="rgb(150, 48, 99)" stroke-width="2"></line>
        <line id="center" x1="5" y1="20" x2="35" y2="20" stroke="rgb(150, 48, 99)" stroke-width="2"></line>
        <line id="down" x1="5" y1="30" x2="35" y2="30" stroke="rgb(150, 48, 99)" stroke-width="2"></line>
    </svg>
</div> `


class hamIcon extends HTMLElement {
    constructor() {
        super()
        this.open=true
        this.border=this.getAttribute('border-on')
        this.attachShadow({mode:"open"})
        this.shadowRoot.appendChild(template.content.cloneNode(true))
        if(this.border){
        this.shadowRoot.querySelector('div').style.border=`3px solid ${this.getAttribute('border-color')}`
        }
    }

    connectedCallback(){
        this.shadowRoot.querySelector('div').addEventListener('click',(e)=>{
            if(this.open){
                this.shadowRoot.querySelector('#close').classList.add("none")
                this.shadowRoot.querySelector('#open').classList.remove("none")
                this.shadowRoot.querySelector('#top').classList.add("line-1")
                this.shadowRoot.querySelector('#mid').classList.add("line-2")
                this.shadowRoot.querySelector('#bottom').classList.add("line-3")
                this.open=!this.open
            }else{
                this.shadowRoot.querySelector('#open').classList.add("none")
                this.shadowRoot.querySelector('#close').classList.remove("none")
                this.shadowRoot.querySelector('#up').classList.add("line-4")
                this.shadowRoot.querySelector('#center').classList.add("line-5")
                this.shadowRoot.querySelector('#down').classList.add("line-6")
                this.open=!this.open
            }
        })
    }
}
window.customElements.define('ham-icon', hamIcon)


