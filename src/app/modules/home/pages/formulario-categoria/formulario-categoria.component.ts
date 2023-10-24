import { Component, OnInit } from '@angular/core';
import { Subscribable } from 'rxjs';
import { Category } from 'src/app/Core/models/Category';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-formulario-categoria',
  templateUrl: './formulario-categoria.component.html',
  styleUrls: ['./formulario-categoria.component.css']
})
export class FormularioCategoriaComponent implements OnInit {
  categoriaForm!: FormGroup;
  showValidationAlert: boolean = false;
  categoryId: string | null = null;

  constructor(private categoryService: CategoryService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.categoriaForm = this.formBuilder.group({
      name: ['', Validators.required]
    });

    this.route.queryParams.subscribe(params => {
      if (params['categoryId']) {
        this.categoryId = params['categoryId'];
      }
    });
  }

  registrarCategoria() {
    if (this.categoriaForm.valid) {
      const category: Category = {
        name: this.categoriaForm.value.name
      };

      if (this.categoryId) {
        category.id = this.categoryId;
        const observable: Subscribable<any> = this.categoryService.editCategory(category.id, category.name);
        const observer = {
          next: () => {
            this.router.navigate(['../'], { relativeTo: this.route });
          },
          error: (error: string) => {
            this.showValidationAlert = true;
            console.log(error);
          }
        };
        observable.subscribe(observer);
      } else {
        const observable: Subscribable<any> = this.categoryService.registerCategory(category);
        const observer = {
          next: () => {
            this.router.navigate(['../'], { relativeTo: this.route });
          },
          error: (error: any) => {
            console.log(error);
            this.showValidationAlert = true;
          }
        };
        observable.subscribe(observer);
      }

    } else {
      this.showValidationAlert = true;
    }
  }

  cancelarRegistro() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
