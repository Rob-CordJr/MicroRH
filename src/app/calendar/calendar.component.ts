import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, defineFullCalendarElement } from '@fullcalendar/web-component';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Calendar, formatDate } from '@fullcalendar/core';




defineFullCalendarElement();

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {
  @ViewChild('calendarEl', { read: ElementRef }) calendarEl: any;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridDay',
    plugins: [dayGridPlugin],
    headerToolbar: {
      left: 'prev, next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay'
    },
    weekends: false,
    locale: 'pt',

  };

  public calendarPlugins = [dayGridPlugin];

  dates: Date[] | any;

  rangeDates: Date[] | any;

  minDate: Date | any;

  maxDate: Date | any;

  invalidDates: Array<Date> | any;

  toggleWeekends() {
    // make a copy while overriding some values
    this.calendarOptions = {
      ...this.calendarOptions,
      weekends: !this.calendarOptions.weekends,
    }
  }


  constructor() { }

  ngOnInit(): void {
    // this.eventCalendar()
  }

  eventCalendar() {

  


    var calendar = new Calendar(this.calendarEl, {
      // initialView: 'dayGridMonth',
      headerToolbar: {
        center: 'addEventButton'
      },
      customButtons: {
        addEventButton: {
          text: 'add event...',
          click: function () {
            var dateStr = prompt('Enter a date in YYYY-MM-DD format');
            var date = new Date(dateStr + 'T00:00:00'); // will be in local time

            if (!isNaN(date.valueOf())) { // valid?
              calendar.addEvent({
                title: 'dynamic event',
                start: date,
                allDay: true
              });
              alert('Great. Now, update your database...');
            } else {
              alert('Invalid date.');
            }
          }
        }
      }
    });

    calendar.render();
  }





  // construirCalendario() {
  //   const ano = this.dataAtual.getFullYear();
  //   const mes = this.dataAtual.getMonth();
  //   const primeiroDiaDaSemana = 0;
  //   const ultimoDiaDaSemana = 6;

  //   const dataInicial = new Date(ano, mes, 1);
  //   while (dataInicial.getDay() !== primeiroDiaDaSemana) {
  //     dataInicial.setDate(dataInicial.getDate() - 1);
  //   }


  //   const dataFinal = new Date(ano, mes + 1, 0);
  //   while (dataFinal.getDay() !== ultimoDiaDaSemana) {
  //     dataFinal.setDate(dataFinal.getDate() + 1);
  //   }

  //   this.diasCalendario = [];
  //   for (
  //     let data = new Date(dataInicial.getTime());
  //     data <= dataFinal;
  //     data.setDate(data.getDate() + 1)
  //   ) {
  //     this.diasCalendario.push(new Date(data.getTime()));
  //   }


  // }

  // alterarMes(offsetMes: number) {
  //   this.dataAtual.setMonth(this.dataAtual.getMonth() + offsetMes);
  //   this.dataAtual = new Date(this.dataAtual.getTime());
  //   this.construirCalendario();
  // }



}
