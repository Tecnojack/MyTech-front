import { Component, inject, OnInit } from '@angular/core';
import { map, pluck } from 'rxjs/operators';
import { ControllerService } from 'src/app/shared/services/controller.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  private controllerService = inject(ControllerService);

  teamVM$ = this.controllerService.getTeam().pipe(
    pluck('data'),
    map((services) => {
      return services.map(({ id, attributes }) => ({
        id,
        title: attributes.name,
        description: attributes.desc,
        imageUrl: this.createImageUrl(attributes.image.data.attributes.url),
        social_profiles: attributes.social_profiles.data.map(
          (profile: any) => profile.attributes.red
        ),
      }));
    })
  );

  createImageUrl(imagePath: string) {
    const baseUrl = 'https://strapi-76ms.onrender.com';
    return baseUrl + imagePath;
  }

}
