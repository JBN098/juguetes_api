import{FormControl, ValidationErrors} from '@angular/forms';


export class FormValidators {

  static notOnlyWhiteSpace(control: FormControl): ValidationErrors | null{
    if ((control.value != null) &&(control.value.trim().length == 0)){

      return{notOnlyWhiteSpace: true};
    }else {
      return null;
    }
  }
  static forbiddenWord (word: string): ValidationErrors | null {
    return(control: FormControl): ValidationErrors | null => {
      const forbidden = new RegExp(word, "i").test(control.value);
      return forbidden ? {forbiddenWord: true} : null;

    }
  }

}
