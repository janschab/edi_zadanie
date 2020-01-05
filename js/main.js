$(document).ready(() => {
    const pola = ['dzien', 'termin', 'typ', 'przedmiot', 'sala', 'od-godz', 'do-godz'];

    const Json = $.getJSON('./json/plan.json', (json) => {
        const template = $('.zajecie').first().clone().removeClass('d-none');
        $('#plan').empty();

        json['plan-zajec']['zajecia'].forEach((zajecie) => {
            if (zajecie.przedmiot) {
                const tpl = template.clone();
                pola.forEach(pole => {
                    tpl.find(`.${pole}`).text(zajecie[pole]);
                });
                tpl.find('.przedmiot').data('tr', zajecie.nazwa);

                if (zajecie.hasOwnProperty('kolokwium')) {
                    tpl.css({
                        backgroundColor: "#ff786e"
                    });
                    tpl.find('.zakres').text(`Zakres materiału: ${zajecie['kolokwium']['zakres']}`)
                } else {
                    tpl.find('.info').empty();
                }

                tpl.appendTo('#plan');
            }
        });

        $('body').on('mouseenter mouseleave', '.zajecie', function() {
            $(this).find('.info').stop().slideToggle('300', 'linear');
        });

        $('body').on('click', '.przedmiot', function() {
            const targetTr = $(this).data().tr;
            $(this).data('tr', $(this).text());
            $(this).text(targetTr);
        });
    });
});
