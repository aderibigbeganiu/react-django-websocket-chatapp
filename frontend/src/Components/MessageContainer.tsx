import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { logout } from "../store/actions/authActions";
import { getOldMessages } from "../store/actions/oldMessagesActions";

var client = new W3CWebSocket("ws://127.0.0.1:8000/ws/chat/hello/");

client.onopen = () => {
	console.log("Websocket client connected");
};
client.onclose = () => {
	console.log("Websocket client closed");
};

client.onerror = () => {
	console.log("Connection error");
};

const MessageContainer = (props: any) => {
	const { user, logout, getOldMessages, oldMessages } = props;
	const [data, setData] = useState({ message: "" });

	const messageEndRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		getOldMessages();
	}, [getOldMessages]);

	useEffect(() => {
		const scrollToBottom = () => {
			messageEndRef.current?.scrollIntoView();
		};
		scrollToBottom();
	});

	const handleChange = (e: any) => {
		setData({
			...data,
			[e.target.name]: e.target.value,
		});
	};

	const sendMessage = (message: any) => {
		if (client.readyState === client.OPEN) {
			client.send(
				JSON.stringify({
					message: message.message,
					username: user.username,
					user_id: user.pk,
				})
			);
		}
	};

	client.onmessage = (e: any) => {
		if (typeof e.data === "string") {
			console.log("Received: '" + e.data + "'");
			const data = JSON.parse(e.data);
			const new_incoming_message = document.createElement("div");
			new_incoming_message.innerHTML = data.message;
			switch (data.username.toString() === user.username.toString()) {
				case true:
					new_incoming_message.className = "incoming-message";
					break;

				default:
					new_incoming_message.className = "outgoing-message";
					break;
			}
			document
				.querySelector("#message-container")!
				.append(new_incoming_message);
		}
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (user.username !== "") {
			sendMessage(data);
		} else {
			localStorage.removeItem("token");
			window.location.reload();
		}
		setData({
			...data,
			message: "",
		});
	};

	const onEnterPress = (e: any) => {
		if (e.keyCode === 13 && e.shiftKey === false) {
			e.preventDefault();
			handleSubmit(e);
		}
	};

	return (
		<div className="content">
			<div className="content-header">
				<div>photo</div>
				<div>last seen</div>
				<div onClick={logout}>Logout</div>
			</div>
			<div className="message-container" id="message-container">
				{oldMessages
					// .filter((oldMessage: any) => oldMessage.sender === user.pk)
					.map((oldMessage: any, index: any) => (
						<div
							key={index}
							className={
								oldMessage.sender === user.pk
									? "incoming-message"
									: "outgoing-message"
							}
						>
							{oldMessage.message}
						</div>
					))}
				<div ref={messageEndRef} />
			</div>
			<form className="form" onSubmit={handleSubmit}>
				<textarea
					className="form-input"
					name="message"
					value={data.message}
					onChange={handleChange}
					onKeyDown={onEnterPress}
					autoFocus={true}
					required
				/>
				<button className="form-button" type="submit">
					Send
				</button>
			</form>
		</div>
	);
};

const mapStateToProps = (state: any) => {
	return {
		user: state.user,
		oldMessages: state.oldMessages,
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		logout: () => {
			dispatch(logout());
		},
		getOldMessages: () => {
			dispatch(getOldMessages());
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageContainer);
