import {Component, inject, OnInit, signal} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {AccordionModule, CardModule, SegmentedControlComponent, SegmentItem} from '@kirbydesign/designsystem';
import {first, skipWhile} from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SegmentedControlComponent, CardModule, AccordionModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private readonly router = inject(Router)
  protected activeRouteIndex = signal(0);
  private initialSkipped = false;

  navItems: SegmentItem[] = [
    {
      text: "ControlValueAccessor",
      id: "cva"
    },
    {
      text: "Parent container injection",
      id: "container-injection",
    },
    {
      text: "ViewChild",
      id: "viewChild"
    },
    {
      text: "Model form",
      id: "model-form"
    },
    {
      text: "Model mixed",
      id: "model-mixed"
    }
  ];

  ngOnInit() {
    this.router.events.pipe(
      skipWhile(e => !(e instanceof NavigationEnd)),
      first()
    ).subscribe(() => {
      const currentRoute = this.router.url.split('/')[1];
      const currentIndex = this.navItems.findIndex(item => item.id === currentRoute);
      if (currentIndex !== -1) {
        this.activeRouteIndex.set(currentIndex);
      }
    });
  }

  async routeChangeClick($event: number) {
    if (!this.initialSkipped) {
      this.initialSkipped = true;
      return;
    }
    const route = this.navItems[$event].id;

    await this.router.navigate([route]);

  }
}
