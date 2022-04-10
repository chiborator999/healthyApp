import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

@Injectable()
export class ErrorHandlerService {
  constructor(
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  handleRequestError(error: { status: any; message: string, error: string }) {
    const status = error.status;
    if (status === 0) {
      return this.router.navigate(['/server-alert']);
    } else {
      this.snackbar.open(`${error.message} with message: ${error.error}`, 'X', {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: 'dangerSnackbar'
      });
    }
    return null;
  }
}
