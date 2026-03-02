import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class Snackbar {
  private readonly snackBar = inject(MatSnackBar);

  success(message: string, duration: number = 3000) {
    this.snackBar.open(message, 'Close', {
      duration,
      panelClass: ['toast-success'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  error(message: string, duration: number = 4000) {
    this.snackBar.open(message, 'Close', {
      duration,
      panelClass: ['toast-error'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  info(message: string, duration: number = 3000) {
    this.snackBar.open(message, 'Close', {
      duration,
      panelClass: ['toast-info'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  warning(message: string, duration: number = 3500) {
    this.snackBar.open(message, 'Close', {
      duration,
      panelClass: ['toast-warning'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
  destroy() {
    this.snackBar.dismiss();
  }
}
