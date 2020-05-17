from typing import Optional, Callable

import asyncio
from phue import Bridge, PhueRegistrationException
import simplejson as json
import threading
import tkinter as tk
import tkinter.font as tkFont
import websockets

state = {}
state['window'] = tk.Tk()

def main():
    # put websocket on its own thread so the GUI doesn't block it
    threading.Thread(target=start_ws_client).start()
    # TODO: cleanup threads when user clicks quit
    run_gui()

def start_ws_client():
    asyncio.set_event_loop(asyncio.new_event_loop())
    loop = asyncio.get_event_loop()
    loop.run_until_complete(ws_client())
    loop.run_forever()

def run_gui():
    gui = GUI(master=state['window'])
    state['gui'] = gui
    gui.mainloop()

def connect_to_bridge() -> None:
    try:
        ip = state['gui'].ent_ip.get()
        if len(ip) is 0:
            ip = 'localhost'

        print(f'connecting to bridge at ${ip}')
        b = Bridge(ip)

        b.connect()

        state['bridge'] = b

        state['gui'].btn_link['text'] = 'Linked!'

    except PhueRegistrationException as e:
        return None

def toggle() -> None:
    cur_state = state['bridge'].get_light(1,'on')
    state['bridge'].set_light(1,{'on': not cur_state})

def handle_hue_click(hue: int) -> Callable[[], None]:
    return lambda _ : state['bridge'].set_light(1,{'hue': hue})

async def ws_client():
    uri = "wss://mmyh4hlyp8.execute-api.us-east-1.amazonaws.com/Prod"
    async with websockets.connect(
        uri, ssl=True
    ) as websocket:
        async for message in websocket:
            await handle_message(message)

async def handle_message(message):
    print(message)
    data = json.loads(message)
    state['bridge'].set_light(1,{'hue': data['hue']})


class GUI(tk.Frame):
    def __init__(self, master=None):
        tk.Frame.__init__(self, master)
        self.pack()
        self.createWidgets()

    def createWidgets(self) -> None:
        self.createTitle()
        self.createLinkUI()
        self.createToggleButton()
        self.createHueButtons()
        self.createQuitButton()

    def createTitle(self) -> None:
        fontStyle = tkFont.Font(size=40)
        self.lbl_title = tk.Label(self, font=fontStyle)
        self.lbl_title['text'] = 'Hue to you too!'
        self.lbl_title.pack()

    def createLinkUI(self) -> None:
        self.frm_link = tk.Frame(self)
        self.frm_link.pack()
        self.frm_link_ip = tk.Frame(self.frm_link)
        self.frm_link_ip.pack()
        # TODO: Get bridge IP from previous session and try to autoconnect
        self.lbl_ip = tk.Label(self.frm_link_ip, text="i.p.")
        self.ent_ip = tk.Entry(self.frm_link_ip)
        self.btn_link = tk.Button(self.frm_link, text='Link to Bridge',
                command=connect_to_bridge)
        self.lbl_ip.pack(side=tk.LEFT)
        self.ent_ip.pack(side=tk.LEFT)
        self.btn_link.pack(side=tk.TOP)

    def createToggleButton(self) -> None:
        self.btn_test = tk.Button(self, text='toggle', command=toggle)
        self.btn_test.pack()

    def createHueButtons(self) -> None:
        self.frm_hue = tk.Frame(self)
        self.frm_hue.pack()
        self.btn_red = tk.Frame(self.frm_hue, width=40, height=40, bg='red')
        self.btn_red.bind("<Button-1>", handle_hue_click(0))
        self.btn_red.pack(side=tk.LEFT)
        self.btn_green = tk.Frame(self.frm_hue, width=40, height=40, bg='green')
        self.btn_green.bind("<Button-1>", handle_hue_click(22222))
        self.btn_green.pack(side=tk.LEFT)
        self.btn_blue = tk.Frame(self.frm_hue, width=40, height=40, bg='blue')
        self.btn_blue.bind("<Button-1>", handle_hue_click(44444))
        self.btn_blue.pack(side=tk.LEFT)

    def createQuitButton(self) -> None:
        self.QUIT = tk.Button(self, text="QUIT", fg="red",
                                            command=state['window'].destroy)
        self.QUIT.pack(side="bottom")


if __name__ == "__main__":
    main()
