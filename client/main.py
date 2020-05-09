from typing import Optional

from phue import Bridge, PhueRegistrationException
import tkinter as tk
import tkinter.font as tkFont

state = {}
state['window'] = tk.Tk()

def main():
    gui = GUI(master=state['window'])
    state['gui'] = gui
    gui.mainloop()
    #bridge = connect_to_bridge()
    #bridge.set_light(1, {'hue': 11111})

def connect_to_bridge() -> None:
    try:
        b = Bridge('localhost')

        b.connect()

        state['bridge'] = b

        state['gui'].btn_link['text'] = 'Linked!'

    except PhueRegistrationException as e:
        return None

def toggle() -> None:
    cur_state = state['bridge'].get_light(1,'on')
    state['bridge'].set_light(1,{'on': not cur_state})

class GUI(tk.Frame):
    def __init__(self, master=None):
        tk.Frame.__init__(self, master)
        self.pack()
        self.createWidgets()

    def createWidgets(self) -> None:
        self.createTitle()
        self.createLinkUI()
        self.createToggleButton()
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

    def createQuitButton(self) -> None:
        self.QUIT = tk.Button(self, text="QUIT", fg="red",
                                            command=state['window'].destroy)
        self.QUIT.pack(side="bottom")


if __name__ == "__main__":
    main()
