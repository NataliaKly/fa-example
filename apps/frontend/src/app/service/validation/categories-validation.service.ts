import { AbstractControl, FormArray, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export const categoryUniqueTitleValidator = (formGroup: FormGroup): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const filteredTitleControls: AbstractControl[] = (formGroup.get("items") as FormArray).controls
      .map((currentControl: AbstractControl) => (<FormGroup>currentControl).controls.title)
      .filter((currentControl: AbstractControl) => currentControl !== control);

    const categoryWithSameName: AbstractControl[] = filteredTitleControls.filter(
      (currentControl: AbstractControl) => currentControl.value === control.value
    );
    return categoryWithSameName.length ? { notUnique: "not unique" } : null;
  };
};
