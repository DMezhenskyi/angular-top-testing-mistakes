import { Component, Input, output } from '@angular/core';
import { WeatherData, TimeSpan } from './types';

@Component({
  selector: 'app-weather-widget',
  standalone: true,
  template: `
    <div class="widget-header">
      <div class="widget-title">Current Weather</div>
      <label> Time Span:
        <select (change)="onTimeSpanChanges($event)">
          <option value="today">Today</option>
          <option value="tomorrow">Tomorrow</option>
        </select>
      </label>
    </div>
    @if (data) {
      <div class="widget-content">
        @if (data.location) {
          <div class="location">{{ data.location }}</div>
          <div class="sky-condition">{{ data.sky }}</div>
          <div class="temperature">{{ data.temperature }}°C</div>
        } @else {
          <p class="no-location">Location isn't defined...</p>
        }
      </div>
    } @else {
      <p class="no-content">No data to display...</p>
    }
  `
})
export class WeatherWidgetComponent {
  @Input() data?: WeatherData;

  timeSpanChange = output<TimeSpan>();

  onTimeSpanChanges(event: Event) {
    this.timeSpanChange.emit(
      (event.target as HTMLInputElement).value as TimeSpan
    );
  }
}
