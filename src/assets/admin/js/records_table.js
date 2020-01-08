$(document).ready(function () {
	(function($) {
		var numAllBtn = 0;
		var numBtnActive;
		var listChecked = [];
		var strFil = "";
		var ctl = $("table.dataTable").attr("controller");

		function delRecord(id, act) {
			urlDele = rootUrl+"admin/"+ctl+"/"+act+"/"+ id;
			$.ajax({
				url: urlDele,
				success: function (data) {
					if(data != 'error'){
						$('#row'+id).remove();
					}
				}
			})
		}

		function toggleRecord(id, job_hot) {
			// alert("job_hot: "  + job_hot);
			urlToggle = rootUrl+"admin/"+ctl+"/changejobhot/"+ id+"/"+ job_hot;
			$.ajax({
				url: urlToggle,
				success: function (data) {
					$('#toggle'+id+' i').attr({"class":(job_hot=='0')?'fa fa-toggle-on':'fa fa-toggle-off'});
					$('#job_hot'+id).html((job_hot=='0')?'Yes':'No');
					$('#toggle'+id).attr({"alt":(job_hot=='0')?id+"_"+'1':id+"_"+'0'});
				}
			})
		}

		$('#btn_filter_'+ctl+'_table').on('click', function(){
			status= $('#select_list_'+ctl+'_status').val();
			type= $('#select_list_'+ctl+'_type').val();
			position= $('#select_list_'+ctl+'_position').val();
			page= $('#select_list_'+ctl+'_page').val();
			type= $('#select_list_'+ctl+'_type').val();
			content = '';
			if(status && status != 'all') content+='/status='+status;
			if(type && type != 'all') content+='/type='+type;
			if(position && position != 'all') content+='/position='+position;
			if(page && page != 'all') content+='/page='+page;
			if(type && type != 'all') content+='/type='+type;
			var url = rootUrl+ 'admin/'+ctl+'/index'+content;
		    window.location.replace(url);
		});

		$('tbody.records').on('click','td.btn-act button.del-record', function () {
			var isDel = confirm("Are you sure to delete this record???");
			if(isDel){
				idAct = $(this).attr('alt');
				delRecord(idAct, 'del');
			}
		});
		
		// ok
		$('tbody.records').on('click','td.btn-act button.toggle-job_hot-record', function () {
			var isToggle = confirm("Are you sure to change hot job this record?");
			if(isToggle){
				data = $(this).attr('alt');
				arr = data.split('_');
				id = arr[0];
				status = arr[1];
				toggleRecord(id,status);
			}
		});

		$('table.dataTable').on('click', '.checkAll input', function () {
			if($(this).prop('checked')) {
				listChecked = [];
				$('.checkboxRecord input').each(function() {
					listChecked.push($(this).attr('alt'));
					$(this).prop('checked', true);
				});
				$('.checkAll input').prop('checked', true);
			} else {
				$('.checkboxRecord input').each(function() {
					listChecked = [];
					$(this).prop('checked', false);
				});
				$('.checkAll input').prop('checked', false);
			}
		});

		//Check to delete
		$('table.dataTable').on('click', '.checkboxRecord input', function () {
			var idCheckBox = $(this).attr('alt');
			if($(this).prop('checked')) {
				listChecked.push(idCheckBox);
			} else {
				listChecked.splice($.inArray(idCheckBox, listChecked), 1);
				$('.checkAll input').prop('checked', false);
			}
		});

		//Click To Delete Record
		$('#delete-records').on('click', function () {
			if(listChecked.length > 0) {
				var isDel = confirm("Are you sure delete those records!");
				if(isDel){
					var ids = listChecked.toString(); 
					urlDel = rootUrl+"admin/"+ctl+"/delmany/ids="+ ids;
					$.ajax({
						url: urlDel,
						success: function (data) {
							if(data != 'error') {
								$.each(listChecked, function (k, v) {
									$('#row'+v).remove();
								});
								listChecked = [];
							}
						}
					})
				}
			} else {
				alert("Nobody to delete!");
			}
		});

		//Table Filter
		$('#table_filter input').on('keyup', function (e) {
			if(e.which == 13){
				strFil = $(this).val().trim();
			} 
		})
		$('#submit-search').off('click').on('click', function () {
			
		});

		$('#form-'+ctl+'-search').submit(function(e) {
			e.preventDefault(); 
			var content = $('#form-'+ctl+'-search').find('input[name="search"]').val();
			if(content === ''){
				window.location.replace(rootUrl+'admin/'+ctl+'');
			}else{
				var arr = window.location.href.split('/')
				var arr2 = window.location.href.split('/p=')
				var last = arr[arr.length-1].split('=');
				if(last[0] == 'p'){
					var url = arr2[0]+'/search='+content;//+'/p='+arr2[1];
				}else{
					var url = window.location.href+'/search='+content;
				}
				window.location.replace(url);
			}
		});
	})(jQuery);
	
});