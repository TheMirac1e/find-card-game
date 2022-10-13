import '../scss/styles.scss';

interface IGameCards {
    cardsNumber: number;
}

class GameCards {
    protected options: IGameCards = {
        cardsNumber: 12,
    }

    private readonly elements: HTMLElement[] = [];
    private readonly selector: string;
    private firstCard: HTMLElement | null = null;
    private secondCard: HTMLElement | null = null;

    private flippedCard = false;
    private lockCards = false;

    public constructor(selector: string) {
        this.selector = selector;
        this.elements = Array.from(document.querySelectorAll<HTMLElement>(this.selector));

        this.init();
    }

    private init(): void {
        this.addClickEvent();
        this.randomizeItems();
    }

    private addClickEvent(): void {
        this.elements.forEach(item => {
            item.addEventListener('click', () => {
                this.flipCard(item);
            })
        })
    }

    private flipCard(card: HTMLElement): any {
        if (this.lockCards) return;
        if (card === this.firstCard) return;
        card.classList.add('is-active');

        if (!this.flippedCard) {
            this.firstCard = card;
            this.flippedCard = true;
            return;
        }

        this.secondCard = card;
        this.lockCards = true;
        this.checkCards();
    }

    private checkCards(): void {
        const isSame = this.firstCard?.dataset.item === this.secondCard?.dataset.item;

        isSame ? this.removeClickEvent() : this.unflipCard();
    }

    private resetActiveItems(): void {
        this.firstCard = null;
        this.secondCard = null;

        this.flippedCard = false;
        this.lockCards = false;
    }

    private removeClickEvent(): void {
        this.secondCard?.removeEventListener('click', this.flipCard(this.secondCard));
        this.firstCard?.removeEventListener('click', this.flipCard(this.firstCard));

        this.resetActiveItems();
    }

    private unflipCard(): void {
        setTimeout(() => {
            this.firstCard?.classList.remove('is-active');
            this.secondCard?.classList.remove('is-active');

            this.resetActiveItems();
        }, 1000);
    }

    private randomizeItems(): void {
        this.elements.forEach(card => {
            const orderNumber = Math.floor(Math.random() * this.options.cardsNumber);
            card.style.order = orderNumber.toString();
        })
    }
}

new GameCards('.cards__item');
