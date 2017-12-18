
var SendSMSForm = React.createClass({
	
	sendSMS: function() {
		var message = $('#message-input').val();
		var send_to = $('#send-to-input').val();
		$('#send-sms-btn').prop('disabled', true);
		
		if(send_to == null || send_to == '' || message == null || message == '') {
			alert('Required fields cannot be empty.');
			$('#send-sms-btn').prop('disabled', false);
			return null;
		}
		var data = {
			message: message,
			to: send_to,
		}
		$.ajax({
			url: '/send-burst-sms',
			type: 'POST',
			data: data,
			success: function(res){
				alert('SMS sending success.');
				$('#send-sms-btn').prop('disabled', false);
				$('#message-input').val('');
				$('#send-to-input').val('');
			}.bind(this),
			error: function(res) {
				alert('SMS sending failed.');
				$('#send-sms-btn').prop('disabled', false);
				$('#message-input').val('');
				$('#send-to-input').val('');
			}.bind(this)
	    })
	},

	render: function(){
		return(
			<div className='row'>
				<div className='col-md-3'></div>
				<div className='col-md-6'>
					<b>Send to*:</b> <input type='number' id='send-to-input' className="form-control" placeholder='63xxxxxxxxxx'/>
					<br/>
					<b>Message*: </b>
					<textarea id='message-input' className="form-control" maxLength="459"></textarea>
					<br/>
					<button id="send-sms-btn" className="btn btn-primary pull-right" onClick={this.sendSMS}>Send SMS</button>
				</div>
				<div className='col-md-3'></div>
			</div>
		)
	}
});

ReactDOM.render(<SendSMSForm/>, document.getElementById('sendSMSForm'));





