class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.isDeleting = false;
        this.type();
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        // Check if deleting
        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Insert text into element
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        // Type speed control
        let typeSpeed = 150;

        // Select pencil icon for writing animation
        const typingElement = document.querySelector('.fas');

        if (this.isDeleting) {
            typeSpeed /= 4;
            // Use Anime.js to animate the pencil during deleting
            anime({
                targets: typingElement,
                rotate: 10,
                scale: 1.2,
                duration: 200,
                easing: 'easeInOutQuad',
                direction: 'alternate',
                loop: true
            });
        } else {
            // Use Anime.js to animate the pencil during typing
            anime({
                targets: typingElement,
                rotate: 0,
                scale: 1,
                duration: 100,
                easing: 'easeOutQuad'
            });
        }

        // If the word is complete
        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;

            // Stop the pencil animation when the word is completed
            anime({
                targets: typingElement,
                scale: 1,
                rotate: 0,
                easing: 'easeInOutQuad',
                duration: 400
            });
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 1000;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = [" Bem vindo(a) ao The Pirate's Daily!", ' ao meu cyberspace!'];
    const wait = 2500;

    new TypeWriter(txtElement, words, wait);
}

