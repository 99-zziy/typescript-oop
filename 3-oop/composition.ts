{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
    hasSugar?: boolean;
  };

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  class CoffeeMachine implements CoffeeMaker {
    private static BEANS_GRAM_PER_SHOT: number = 7;
    private coffeeBeans: number = 0;

    constructor(coffeeBeans: number) {
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
      return this.extract(shots);
    }
  }

  class CheapMilkSteamer extends CoffeeMachine {
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

  class SugarMixer extends CoffeeMachine {
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

  class CafeLatteMachine extends CoffeeMachine {
    constructor(beans: number, private milkSteamer: CheapMilkSteamer) {
      super(beans);
    }

    private steamMilk() {
      console.log("steaming milk....");
    }

    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      return this.milkSteamer.makeMilk(coffee);
    }
  }

  class SweetCoffeeMachine extends CoffeeMachine {
    constructor(beans: number, private sugar: SugarMixer) {
      super(beans);
    }

    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      return this.sugar.addSugar(coffee);
    }
  }

  const machines: CoffeeMaker[] = [
    new CoffeeMachine(16),
    new CafeLatteMachine(16, new CheapMilkSteamer(16)),
    new SweetCoffeeMachine(16, new SugarMixer(16)),
  ];

  machines.map((machine) => {
    machine.makeCoffee(1);
    console.log("");
  });
}
