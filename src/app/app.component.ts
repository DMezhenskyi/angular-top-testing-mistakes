import { Component, signal } from '@angular/core';
import { WeatherWidgetComponent } from './weather-widget/weather-widget.component';
import { TimeSpan, WeatherData } from './weather-widget/types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [WeatherWidgetComponent],
  template: `
    <app-weather-widget
      timeSpan="tomorrow"
      [data]="widgetData()"
      (timeSpanChange)="updatedWidget($event)"></app-weather-widget>
  `,
})
export class AppComponent {

  widgetData = signal<WeatherData | undefined>({
    temperature: 22,
    sky: '⛅',
    location: 'Vienna',
  })

  updatedWidget(period: TimeSpan) {
    if (period === 'today') {
      this.widgetData.update(data => data && ({...data, sky: '⛅', temperature: 25}));
      return;
    }
    this.widgetData.update(data => data && ({...data, sky: '🌧️', temperature: 22}));
  }
}
