{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
    hasSugar?: boolean;
  };

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  interface MilkProvider {
    makeMilk(coffee: CoffeeCup): CoffeeCup;
  }
  interface SugarProvider {
    addSugar(coffee: CoffeeCup): CoffeeCup;
  }

  class CoffeeMachine implements CoffeeMaker {
    private static BEANS_GRAM_PER_SHOT: number = 7;
    private coffeeBeans: number = 0;

    constructor(
      coffeeBeans: number,
      private milkSteamer: MilkProvider,
      private sugarMixer: SugarProvider
    ) {
      this.coffeeBeans = coffeeBeans;
    }

    fillCoffeeBeans(coffeeBeans: number) {
      if (coffeeBeans < 0) {
        throw new Error("value for beans greater than 0");
      }
      this.coffeeBeans += coffeeBeans;
    }

    clean(): void {
      console.log("cleaning the machine...");
    }

    private grindBeans(shots: number) {
      if (this.coffeeBeans < shots * CoffeeMachine.BEANS_GRAM_PER_SHOT) {
        throw new Error("not enough coffee beans");
      }
      this.coffeeBeans -= shots * CoffeeMachine.BEANS_GRAM_PER_SHOT;
    }

    private preHeat() {
      console.log("heating up...");
    }

    private extract(shots: number): CoffeeCup {
      console.log("extract...");
      return {
        shots,
        hasMilk: false,
      };
    }

    makeCoffee(shots: number): CoffeeCup {
      this.grindBeans(shots);
      this.preHeat();
      const coffee = this.extract(shots);
      const sugarAdded = this.sugarMixer.addSugar(coffee);
      return this.milkSteamer.makeMilk(sugarAdded);
    }
  }

  class CheapMilkSteamer implements MilkProvider {
    private steamMilk() {
      console.log("steaming milk....");
    }

    makeMilk(coffee: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...coffee,
        hasMilk: true,
      };
    }
  }

  class FancyMilkSteamer implements MilkProvider {
    private steamMilk() {
      console.log("steaming milk....");
    }

    makeMilk(coffee: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...coffee,
        hasMilk: true,
      };
    }
  }

  class NoMilkSteamer implements MilkProvider {
    makeMilk(coffee: CoffeeCup): CoffeeCup {
      return coffee;
    }
  }

  class SugarMixer implements SugarProvider {
    private getSugar() {
      console.log("getting some sugar....");
    }

    addSugar(coffee: CoffeeCup): CoffeeCup {
      this.getSugar();

      return {
        ...coffee,
        hasSugar: true,
      };
    }
  }

  class NoSugarMixer implements SugarProvider {
    addSugar(coffee: CoffeeCup): CoffeeCup {
      return coffee;
    }
  }

  const cheapMilkSteamer = new CheapMilkSteamer();
  const fancyMilkSteamer = new FancyMilkSteamer();
  const noMilkSteamer = new NoMilkSteamer();

  const sugarMixer = new SugarMixer();
  const noSugarMixer = new NoSugarMixer();

  const cheapCafeLatte = new CoffeeMachine(12, cheapMilkSteamer, sugarMixer);
  const fancyCafeLatte = new CoffeeMachine(12, fancyMilkSteamer, noSugarMixer);
}
