interface ProfileInfoBoxProps {
  icon: React.ReactNode;
  iconColor: string;
  lable: string;
  value: string;
}
function ProfileInfoBox({
  icon,
  iconColor,
  lable,
  value,
}: ProfileInfoBoxProps) {
  return (
    <div className="bg-base-100 rounded-2xl p-5 shadow-md border border-base-300 hover:shadow-xl transition-all">
      <div className="flex items-center gap-2 md:gap-4">
        <div
          className={`w-8 h-8 md:w-12 md:h-12 rounded-xl bg-${iconColor}/10 flex items-center justify-center text-${iconColor}`}
        >
          {icon}
        </div>

        <div>
          <p className="text-[12px] text-base-content/60">{lable}</p>

          <h3 className="font-bold text-[16px] md:text-lg">{value}</h3>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfoBox;
