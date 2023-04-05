import { Benefits } from './../../shared/interfaces/services';
import { ControllerService } from 'src/app/shared/services/controller.service';
import { Component, inject } from '@angular/core';
import { Services, ServicesDatum } from 'src/app/shared/interfaces/services';
import { pluck, map } from 'rxjs/operators';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent {
  
  private controllerService = inject(ControllerService);

  servicesVM$ = this.controllerService.getServices().pipe(
    pluck('data'),
    map((services) => {
      return services.map(({ id, attributes }) => ({
        id,
        title: attributes.title,
        description: attributes.desc,
        imageUrl: this.createImageUrl(attributes.image.data.attributes.url),
        benefits: attributes.benefits.data.map(
          (benefit) => benefit.attributes.desc
        ),
      }));
    })
  );

  createImageUrl(imagePath: string) {
    const baseUrl = 'https://strapi-76ms.onrender.com';
    return baseUrl + imagePath;
  }
}
