const template = document.createElement('template');

template.innerHTML = `
    <div>
    <h1>SHAKE</h1>
</div>
`;

class ShakyShaky extends HTMLElement {
    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.acl = null;
        this.eventListenerAdded = false;
    }

    connectedCallback() {
        if (!this.eventListenerAdded) {
            window.addEventListener("load", this.startShakyShaky.bind(this));
            this.eventListenerAdded = true;
        }

        this._render();
    }

    _render() {}

    startShakyShaky() {

        const onShake = () => {
            this.dispatchEvent(
                new CustomEvent('onShake')
            );
            this._render();
        }

        const doShakyShaky = () => {
            let shaking = false;

            const onReading = ()  => {
                const shakeTreashold = 3 * 9.8;
                const stillTreashold = 1;
                let magnitude = Math.hypot(this.acl.x, this.acl.y, this.acl.z);
                if (magnitude > shakeTreashold) {
                    onShake();
                    shaking = true;
                } else if (magnitude < stillTreashold && shaking) {
                    shaking = false;
                }
            }

            this.acl.addEventListener("reading", onReading);
        }


        this.acl = new LinearAccelerationSensor({ frequency: 60 });
        this.acl.addEventListener("activate", doShakyShaky);
        this.acl.addEventListener("error", () => {
            alert('no shaky shaky for you');
        });
        this.acl.start();
    }

}

window.customElements.define('shaky-shaky', ShakyShaky);
