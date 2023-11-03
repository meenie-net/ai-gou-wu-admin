import { Menu, Tab, Tabs } from "@blueprintjs/core";
import { MenuItem2 } from "@blueprintjs/popover2";
import i18n, { lngs, TLngsKey } from "../../../../i18n";

const Notification = () => {
  return (
    <Tabs animate className="p-2">
      <Tab
        id="rx"
        title="通知"
        tagContent={10}
        tagProps={{ round: true }}
        panel={<NotificationPanel />}
        panelClassName="mt-1 border-slate-200 border-t"
      />
      <Tab
        id="ng"
        title="消息"
        panel={<MessagePanel />}
        panelClassName="mt-1 border-slate-200 border-t"
        tagContent={10}
        tagProps={{ round: true }}
      />
    </Tabs>
  );
};

const NotificationPanel = () => (
  <Menu className="min-w-[60px]">
    {Object.keys(lngs).map((lng) => (
      <MenuItem2
        className={i18n.resolvedLanguage === lng ? "font-bold" : "font-normal"}
        key={lng}
        text={lngs[lng as TLngsKey].nativeName}
      />
    ))}
  </Menu>
);
const MessagePanel = () => <>消息</>;

export default Notification;
