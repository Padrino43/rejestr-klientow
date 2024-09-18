import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Client } from '../../../../core/models/client.model';
import { DeleteClientDialogComponent } from '../delete-client-dialog/delete-client-dialog.component';

@Component({
  selector: 'app-edit-client-dialog',
  templateUrl: './edit-client-dialog.component.html',
  styleUrl: './edit-client-dialog.component.scss',
})
export class EditClientDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<EditClientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { client: Client },
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }
}
