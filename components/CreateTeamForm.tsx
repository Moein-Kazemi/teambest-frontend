"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";

import {
  createTeamSchema,
  CreateTeamFormData,
} from "@/validation/teamValidationsSchema";
import Image from "next/image";
import { createTeam } from "@/lib/teamActions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

// ==================== TYPES ====================

interface IUser {
  _id: string;
  name: string;
  family: string;
  avatar: string;
  jobTitle: string;
}

interface CreateTeamFormProps {
  token: string;
  ownerId: string;
}

// ==================== COMPONENT ====================

export default function CreateTeamForm({
  token,
  ownerId,
}: CreateTeamFormProps) {
  const { update } = useSession();
  const [searchedUsers, setSearchedUsers] = useState<IUser[]>([]);
  const [searchPhone, setSearchPhone] = useState("");
  const router = useRouter();
  // const [users, setUsers] = useState<IUser[]>([]);
  // const [loadingUsers, setLoadingUsers] = useState(true);

  // ==================== FORM ====================

  const {
    register,
    control,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting, isValid },
  } = useForm<CreateTeamFormData>({
    resolver: zodResolver(createTeamSchema),

    defaultValues: {
      name: "",
      summary: "",
      logo: "",
      ownerId,
      members: [],
      projects: [],
    },
  });

  // ==================== FIELD ARRAY ====================

  const {
    fields: memberFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "members",
  });

  //  ==================== BIND SERVER ACTION WITH OWNER ID ============

  // ==================== SUBMIT ====================

  const onSubmit = async (data: CreateTeamFormData) => {
    const result = await createTeam(data);
    if (result.success) {
      await update();
      toast.success("تیم با موفقیت ایجاد شد.");
      router.refresh();
    } else {
      toast.error("تشکیل تیم ناموفق");
    }
    router.replace("/team");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 card rounded-2xl shadow-[0_3px_20px_rgba(0,0,0,0.25)]  bg-base-100 border-t border-t-gray-700/20   max-w-4xl mx-auto py-4 px-6"
    >
      {/* ==================== TEAM NAME ==================== */}
      <div className="form-control flex gap-2 flex-col md:flex-row md:items-center pb-7 md:pb-0">
        <label className="label min-w-40">
          <span className="label-text text-black">
            نام تیم
            <span className="text-red-600">*</span>
          </span>
        </label>

        <div className="relative w-full">
          <input
            type="text"
            required
            autoFocus
            {...register("name")}
            className="input border border-primary/20 outline-primary w-full"
            placeholder="نام تیم را وارد کنید"
          />

          {errors.name && (
            <label className="label inline-block absolute -bottom-7 right-0">
              <span className="label-text-alt text-error">
                {errors.name.message}
              </span>
            </label>
          )}
        </div>
      </div>
      {/* ==================== SUMMARY ==================== */}
      <div className="form-control flex gap-2 flex-col md:flex-row md:items-start pb-7 md:pb-0">
        <label className="label min-w-40">
          <span className="label-text text-black">
            خلاصه تیم
            <span className="text-red-600">*</span>
          </span>
        </label>

        <div className="relative w-full">
          <textarea
            rows={5}
            {...register("summary")}
            className="textarea border border-primary/20 outline-primary w-full"
            placeholder="خلاصه فعالیت تیم را وارد کنید"
          />

          {errors.summary && (
            <label className="label inline-block absolute -bottom-7 right-0">
              <span className="label-text-alt text-error">
                {errors.summary.message}
              </span>
            </label>
          )}
        </div>
      </div>
      {/* ==================== LOGO ==================== */}
      <div className="form-control rounded-2xl bg-orange-200/50 items-center flex gap-2 flex-col md:flex-row md:items-center pb-7 md:pb-0">
        <p className="p-4 text-primary/70 text-center">
          در نسخه های بعدی میتوانید برای تیم خود لوگو قرار دهید.
        </p>
      </div>

      {/* ==================== MEMBER SEARCH SECTION ==================== */}

      <div className="border border-base-300 rounded-2xl p-5 grid gap-6">
        <div className="form-control flex gap-2 flex-col md:flex-row md:items-start pb-7 md:pb-0">
          <label className="label min-w-40">
            <span className="label-text text-black">جستجوی عضو</span>
          </label>

          <div className="relative w-full">
            {/* SEARCH INPUT + BUTTON */}

            <div className="flex flex-col md:flex-row gap-3">
              <input
                type="text"
                value={searchPhone}
                onChange={(e) => setSearchPhone(e.target.value)}
                placeholder="شماره تماس عضو را وارد کنید"
                className="input border border-primary/20 outline-primary w-full"
              />

              <button
                type="button"
                className="btn btn-primary"
                onClick={async () => {
                  try {
                    if (!searchPhone || searchPhone.length < 4) {
                      return;
                    }

                    const { data } = await axios.get(
                      `http://127.0.0.1:5000/api/v1/users/?phone=${searchPhone}`,
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      },
                    );

                    setSearchedUsers(data.data.users || []);
                  } catch (error) {
                    console.error(error);
                  }
                }}
              >
                جستجو
              </button>
            </div>

            {/* SEARCH RESULTS */}

            {searchedUsers.length > 0 && (
              <div className="mt-4 border border-base-300 rounded-2xl overflow-hidden bg-base-100 shadow-xl">
                {searchedUsers.map((user) => (
                  <div
                    key={user._id}
                    className="flex items-center justify-between gap-4 p-4 border-b border-base-200 last:border-b-0"
                  >
                    {/* USER INFO */}

                    <div className="flex items-center gap-4 relative">
                      <Image
                        src={`/avatar/${user.avatar}`}
                        alt={user.name}
                        width="48"
                        height="48"
                        className="w-12 h-12 rounded-full object-cover"
                      />

                      <div>
                        <h3 className="font-bold">
                          {user.name} {user.family}
                        </h3>

                        <p className="text-sm text-base-content/60">
                          {user.jobTitle}
                        </p>
                      </div>
                    </div>

                    {/* ADD BUTTON */}

                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        const currentMembers = getValues("members");

                        const exists = currentMembers.some(
                          (member) => member.memberId === user._id,
                        );

                        if (exists) {
                          return;
                        }

                        append({
                          memberId: user._id,
                          memberName: `${user.name} ${user.family}`,
                          memberAvatar: user.avatar,
                          memberJobTitle: user.jobTitle,
                        });

                        // reset search
                        setSearchPhone("");

                        // clear results
                        setSearchedUsers([]);
                      }}
                    >
                      افزودن
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* SELECTED MEMBERS */}

            {memberFields.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-3">
                {memberFields.map((member, memberIndex) => (
                  <div
                    key={member.id}
                    className="badge badge-primary gap-2 py-5 px-4"
                  >
                    <span>{member.memberName}</span>

                    <button
                      type="button"
                      onClick={() => remove(memberIndex)}
                      className="text-white hover:text-error"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ==================== SUBMIT ==================== */}
      <div className="form-control mt-6">
        <button
          type="submit"
          disabled={isSubmitting || !isValid}
          className={`btn btn-success w-full rounded-xl p-4 `}
        >
          {isSubmitting ? (
            <span className="loading loading-spinner text-primary w-4 h-4"></span>
          ) : (
            "ایجاد تیم"
          )}
        </button>
      </div>
    </form>
  );
}
