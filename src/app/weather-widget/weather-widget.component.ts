import { ChangeDetectionStrategy, Component, input, Input, output } from '@angular/core';
import { WeatherData, TimeSpan } from './types';

@Component({
  selector: 'app-weather-widget',
  standalone: true,
  template: `
    <div class="widget-header">
      <div class="widget-title">Current Weather</div>
      <label>Time Span:
        <select data-testId="time-span" (change)="onTimeSpanChanges($event)">
          <option value="today">Today</option>
          <option value="tomorrow">Tomorrow</option>
        </select>
      </label>
    </div>
    @if (data()) {
      <div class="widget-content">
        @if (data()?.location) {
          <div class="location">{{ data()?.location }}</div>
          <div class="sky-condition">{{ data()?.sky }}</div>
          <div class="temperature">{{ data()?.temperature }}°C</div>
        } @else {
          <p data-testId="no-location" class="no-location-section">Location isn't defined...</p>
        }
      </div>
    } @else {
      <p class="no-content">No data to display...</p>
    }
  `
})
export class WeatherWidgetComponent {
  data = input<WeatherData>();

  timeSpanChange = output<TimeSpan>();

  onTimeSpanChanges(event: Event) {
    this.timeSpanChange.emit(
      (event.target as HTMLInputElement).value as TimeSpan
    );
  }
}
