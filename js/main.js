$(document).ready(() => {
    const pola = ['dzien', 'termin', 'typ', 'przedmiot', 'sala'];

    const Json = $.getJSON('/json/plan.json', (json) => {
        const template = $('.zajecie').first().clone().removeClass('d-none');
        $('#plan').empty();

        json['plan-zajec']['zajecia'].forEach((zajecie) => {
            if (zajecie.przedmiot) {
                const tpl = template.clone();
                pola.forEach(pole => {
                    tpl.find(`.${pole}`).text(zajecie[pole]);
                });
                if (zajecie.hasOwnProperty('kolokwium')) {
                    tpl.css({
                        backgroundColor: "#ff786e"
                    });
                }

                tpl.data(zajecie);

                tpl.appendTo('#plan');
            }
        });
    });
});
