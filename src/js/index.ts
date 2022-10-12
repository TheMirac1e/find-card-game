import '../scss/styles.scss';

interface IGameCards {
    classList: {
        [key: string]: string;
    };
}

class GameCards {
    // protected options: IGameCards = {
    //     classList: {
    //         cardsItem: 'cards__item'
    //     }
    // }
    private elements: HTMLElement[] = [];
    private readonly selector: string

    public constructor(selector: string) {
        this.selector = selector;
        this.elements = Array.from(document.querySelectorAll<HTMLElement>(this.selector));

        this.init();
    }

    private init(): void {
        this.elements.forEach(item => {
            console.log(item);
        })
    }
}

new GameCards('.cards__item');
