$(document).ready(function () {

		function slugify(text){
            text = text.toString().toLowerCase().trim();
            const sets = [
              {to: 'a', from: '[ÀÁÂÃÄÅÆĀĂĄẠẢẤẦẨẪẬẮẰẲẴẶ]'},
              {to: 'c', from: '[ÇĆĈČ]'},
              {to: 'd', from: '[ÐĎĐÞ]'},
              {to: 'e', from: '[ÈÉÊËĒĔĖĘĚẸẺẼẾỀỂỄỆ]'},
              {to: 'g', from: '[ĜĞĢǴ]'},
              {to: 'h', from: '[ĤḦ]'},
              {to: 'i', from: '[ÌÍÎÏĨĪĮİỈỊ]'},
              {to: 'j', from: '[Ĵ]'},
              {to: 'ij', from: '[Ĳ]'},
              {to: 'k', from: '[Ķ]'},
              {to: 'l', from: '[ĹĻĽŁ]'},
              {to: 'm', from: '[Ḿ]'},
              {to: 'n', from: '[ÑŃŅŇ]'},
              {to: 'o', from: '[ÒÓÔÕÖØŌŎŐỌỎỐỒỔỖỘỚỜỞỠỢǪǬƠ]'},
              {to: 'oe', from: '[Œ]'},
              {to: 'p', from: '[ṕ]'},
              {to: 'r', from: '[ŔŖŘ]'},
              {to: 's', from: '[ßŚŜŞŠ]'},
              {to: 't', from: '[ŢŤ]'},
              {to: 'u', from: '[ÙÚÛÜŨŪŬŮŰŲỤỦỨỪỬỮỰƯ]'},
              {to: 'w', from: '[ẂŴẀẄ]'},
              {to: 'x', from: '[ẍ]'},
              {to: 'y', from: '[ÝŶŸỲỴỶỸ]'},
              {to: 'z', from: '[ŹŻŽ]'},
              {to: '-', from: '[·/_,:;\']'}
            ];
            sets.forEach(set => {
              text = text.replace(new RegExp(set.from,'gi'), set.to)
            });
        
            return text.toString().toLowerCase()
              .replace(/\s+/g, '-')           // Replace spaces with -
              .replace(/&/g, '-and-')         // Replace & with 'and'
              .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
              .replace(/\--+/g, '-')         // Replace multiple - with single -
              .replace(/^-+/, '')             // Trim - from start of text
              .replace(/-+$/, '');             // Trim - from end of text
        }

        $("#title").keyup(function(){
            $("#title_slug").val(slugify($(this).val()));
        });
        $(' #experience_select').on('change', function () {
           var selectedValue = this.selectedOptions[0].value;
           if(selectedValue==1){
             $('#experience_time_from').removeAttr('style');
           }else {
             $("#experience_time_from").attr("style", "display:none");
           }
        });
        $(' #salary_select').on('change', function () {
           var selectedValue = this.selectedOptions[0].value;
           if(selectedValue==0){
            $('#salary_select_0').removeAttr('style');
          }else {
            $("#salary_select_0").attr("style", "display:none");
          }           
          if(selectedValue==2){
            $('#salary_select_2').removeAttr('style');
          }else {
            $("#salary_select_2").attr("style", "display:none");
          }
        });
});