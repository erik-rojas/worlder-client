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

        $("#form-static_pages").submit(function(e) {
            e.preventDefault(); 
            var url = rootUrl+"admin/static_pages/static_pages_add_ajax"; 
            var title = $('#form-static_pages').find('input[name="static_page[title]"]').val();
            var oEditor = CKEDITOR.instances.editor1;
            var content = oEditor.getData();
            var title_slug = $('#form-static_pages').find('input[name="static_page[slug]"]').val();
           
            var dataform = {
                title, content, title_slug
            }
            $('#static_pages-title').html('')
            $('#static_pages-content').html('')

            $.ajax({
                type: "POST",
                url: url,
                data: dataform, 
                success: function(data)
                {
                    $(location).attr('href', rootUrl+"admin/static_pages");
                },
                error:function(err){
                    alert('Created unsuccessful  ')
                    Object.keys(JSON.parse(err.responseText).data).map(item=>{
                        if(item === 'title_slug') alert('Title slug already exist!')
                        $('#static_pages-'+item).html(JSON.parse(err.responseText).data[item])
                    })
                }
            });
        });

        $("#form-static_pages-edit").submit(function(e) {
            e.preventDefault(); 
            var id = $('#form-static_pages-edit').find('input[name="static_page[id]"]').val();
            var url = rootUrl+"admin/static_pages/edit/"+id; 

            var title = $('#form-static_pages-edit').find('input[name="static_page[title]"]').val();
            var oEditor = CKEDITOR.instances.editor1;
            var content = oEditor.getData();
            var title_slug = $('#form-static_pages-edit').find('input[name="static_page[slug]"]').val();
           
            var dataform = {
                title, content, title_slug
            }
            $('#static_pages-edit-title').html('')
            $('#static_pages-edit-content').html('')
            $.ajax({
                type: "POST",
                url: url,
                data: dataform, 
                success: function(data)
                {
                    alert('Edit successfully');
                    $(location).attr('href', rootUrl+'admin/static_pages');
                },
                error:function(err){
                    Object.keys(JSON.parse(err.responseText).data).map(item=>{
                        if(item === 'title_slug') alert('Title slug already exist!')
                        $('#static_pages-edit-'+item).html(JSON.parse(err.responseText).data[item])
                    })
                }
            });
        });

});