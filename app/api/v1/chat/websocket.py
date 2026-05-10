from typing import Dict

from fastapi import WebSocket, WebSocketDisconnect


class ChatManager:

    def __init__(self):

        self.active_connections: Dict[str, set[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, room_id: str):

        await websocket.accept()
        if room_id not in self.active_connections:
            self.active_connections[room_id] = set()
        self.active_connections[room_id].add(websocket)


    def disconnect(self, websocket: WebSocket, room_id: str):
        if room_id in self.active_connections:
            self.active_connections[room_id].discard(websocket)

            if not self.active_connections[room_id]:
                del self.active_connections[room_id]

    async def send_to_room(self, room_id: str, message: dict):
        if room_id not in self.active_connections:
            return
        for connection in self.active_connections[room_id]:
            await connection.send_json(message)


manager = ChatManager()