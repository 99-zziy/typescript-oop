{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  class CoffeeMaker {
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

    makeCoffee(shots: number): CoffeeCup {
      if (this.coffeeBeans < shots * CoffeeMaker.BEANS_GRAM_PER_SHOT) {
        throw new Error("not enough coffee beans");
      }
      this.coffeeBeans -= shots * CoffeeMaker.BEANS_GRAM_PER_SHOT;
      return {
        shots,
        hasMilk: false,
      };
    }
  }

  const maker = new CoffeeMaker(32);
  const coffee = maker.makeCoffee(2);

  console.log(coffee);
}
