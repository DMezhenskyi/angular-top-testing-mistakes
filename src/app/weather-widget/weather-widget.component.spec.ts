import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherWidgetComponent } from './weather-widget.component';
import { By } from '@angular/platform-browser';
import { WeatherData } from './types';

describe(`WeatherWidgetComponent`, () => {
  let component: WeatherWidgetComponent;
  let fixture: ComponentFixture<WeatherWidgetComponent>;

  let widgetTestingData: WeatherData = {
    location: `Test Country`,
    sky: `🌧️`,
    temperature: 20
  };

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherWidgetComponent);
    component = fixture.componentInstance;
  });

  it(`should render weather data if provided`, () => {
    component.data = widgetTestingData;
    fixture.detectChanges();
    const locationEl = fixture.debugElement.query(By.css('.location'));
    const skyEl = fixture.debugElement.query(By.css('.sky-condition'));
    const temperatureEl = fixture.debugElement.query(By.css('.temperature'));

    expect(locationEl.nativeElement.textContent).toContain(widgetTestingData?.location);
    expect(skyEl.nativeElement.textContent).toContain(widgetTestingData?.sky);
    expect(temperatureEl.nativeElement.textContent).toContain(`${widgetTestingData?.temperature}`);
  })
  it(`should show "no-location" placeholder if no location provided`, () => {
    widgetTestingData.location = undefined;
    component.data = widgetTestingData;

    fixture.detectChanges();

    const noLocationEl = fixture.debugElement.query(By.css('.no-location'));
    expect(noLocationEl).toBeTruthy();
  })
  it(`should emit (timeSpanChange) when time span changes`, () => {
    component.timeSpanChange.subscribe((period) => {
      expect(period).toBe('tomorrow');
    })

    component.onTimeSpanChanges({
      target: {
        value: 'tomorrow'
      }
    } as any)

  });
});
