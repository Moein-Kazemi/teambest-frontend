interface ProfileTopGradientProps {
  completion: number;
}

function ProfileTopGradient({ completion }: ProfileTopGradientProps) {
  return (
    <div className="h-24 bg-linear-to-r from-primary via-secondary to-accent relative">
      {/* PROFILE COMPLETION */}
      <div className="absolute left-1/2 -bottom-16 -translate-x-1/2">
        <div className="relative">
          {/* COMPLETION PROFILE  */}
          <div
            className="radial-progress text-primary bg-base-100 border-10 border-base-100 shadow-xl"
            style={
              {
                "--value": completion,
                "--size": "5rem",
                "--thickness": "3px",
              } as React.CSSProperties
            }
          >
            <div className="text-center">
              <div className="text-xl font-black text-primary">
                {completion}%
              </div>
              <div className="text-[10px] text-base-content/60 mt-1">
                تکمیل پروفایل
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileTopGradient;
