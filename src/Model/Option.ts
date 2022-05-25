class Option {
  name: string;
  isSelected: boolean;

  constructor({ name, isSelected }: Option) {
    this.name = name;
    this.isSelected = isSelected;
  }

  setIsSelected = (isSelected: boolean) => {
    this.isSelected = isSelected;
  };

  getIsSelected = () => {
    return this.isSelected;
  };
}

export default Option;
