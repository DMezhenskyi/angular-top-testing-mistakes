import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherWidgetComponent } from './weather-widget.component';
import { By } from '@angular/platform-browser';
import { WeatherData } from './types';

describe(`WeatherWidgetComponent`, () => {
  let component: WeatherWidgetComponent;
  let fixture: ComponentFixture<WeatherWidgetComponent>;

  let widgetTestingData: WeatherData;

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    widgetTestingData  = {
      location: `Test Country`,
      sky: `🌧️`,
      temperature: 20
    };
  });

  it(`should render weather data if provided`, () => {
    fixture.componentRef.setInput('data', widgetTestingData);
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
    fixture.componentRef.setInput('data', widgetTestingData);

    fixture.detectChanges();

    const noLocationEl = fixture.debugElement.query(
      By.css('[data-testId="no-location"]')
    );
    expect(noLocationEl).toBeTruthy();
  })
  it(`should emit (timeSpanChange) when time span changes`, () => {
    let expectedOutput: string | undefined;
    component.timeSpanChange.subscribe((period) => {
      expectedOutput = period;
    })
    
    const selectEl = fixture.debugElement.query(By.css('[data-testId="time-span"]'))
    selectEl.nativeElement.value = 'tomorrow';
    selectEl.nativeElement.dispatchEvent(new Event('change'))
    
    expect(expectedOutput).toBe('tomorrow');
  });
});
