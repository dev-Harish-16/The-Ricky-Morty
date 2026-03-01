import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class Snackbar {
  private readonly snackBar = inject(MatSnackBar);

  open(message: string, action: string = 'Close', duration: number = 3000) {
    this.snackBar.open(message, action, {
      verticalPosition: 'top',
      horizontalPosition: 'center',
      duration,
    });
  }
  destroy() {
    this.snackBar.dismiss();
  }
}
