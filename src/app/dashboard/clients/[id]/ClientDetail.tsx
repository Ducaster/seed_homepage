"use client";

import { useState } from "react";
import Link from "next/link";
import type { Client } from "@/types/client";
import { GrowthStageCard } from "@/components/dashboard/GrowthStage";
import {
  addSession,
  addAssessment,
  deleteSession,
  deleteAssessment,
  deleteClient,
  updateClient,
} from "@/app/dashboard/actions";
import { ASSESSMENTS } from "@/data/assessments";
import { programs } from "@/data/programs";
import {
  ArrowLeft,
  Plus,
  Calendar,
  FileText,
  Edit3,
  X,
  ChevronDown,
  ChevronRight,
  ClipboardList,
} from "lucide-react";

export default function ClientDetail({ client }: { client: Client }) {
  const [showSessionForm, setShowSessionForm] = useState(false);
  const [showAssessmentForm, setShowAssessmentForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [expandedSession, setExpandedSession] = useState<string | null>(
    null
  );
  const [expandedAssessment, setExpandedAssessment] =
    useState<string | null>(null);

  const today = new Date().toISOString().split("T")[0];

  return (
    <div>
      <Link
        href="/dashboard/clients"
        className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text transition-colors mb-6"
      >
        <ArrowLeft size={16} />
        내담자 목록
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <GrowthStageCard sessionCount={client.sessions.length} />

          {/* Client Info */}
          <div className="bg-card rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-bold text-text">
                내담자 정보
              </h3>
              <button
                onClick={() => setShowEditForm(!showEditForm)}
                className="p-1.5 rounded-[var(--radius-sm)] text-text-light hover:text-primary hover:bg-primary-pale transition-colors cursor-pointer"
              >
                {showEditForm ? <X size={16} /> : <Edit3 size={16} />}
              </button>
            </div>

            {showEditForm ? (
              <form action={updateClient} className="space-y-3">
                <input type="hidden" name="id" value={client.id} />
                <input
                  name="name"
                  defaultValue={client.name}
                  required
                  placeholder="이름"
                  className="w-full px-3 py-2 text-sm rounded-[var(--radius-sm)] border border-border-light bg-bg focus:outline-none focus:border-primary"
                />
                <input
                  name="phone"
                  defaultValue={client.phone}
                  required
                  placeholder="연락처"
                  className="w-full px-3 py-2 text-sm rounded-[var(--radius-sm)] border border-border-light bg-bg focus:outline-none focus:border-primary"
                />
                <input
                  name="email"
                  defaultValue={client.email}
                  placeholder="이메일"
                  className="w-full px-3 py-2 text-sm rounded-[var(--radius-sm)] border border-border-light bg-bg focus:outline-none focus:border-primary"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    name="birthDate"
                    type="date"
                    defaultValue={client.birthDate || ""}
                    placeholder="생년월일"
                    className="w-full px-3 py-2 text-sm rounded-[var(--radius-sm)] border border-border-light bg-bg focus:outline-none focus:border-primary"
                  />
                  <select
                    name="gender"
                    defaultValue={client.gender}
                    className="w-full px-3 py-2 text-sm rounded-[var(--radius-sm)] border border-border-light bg-bg focus:outline-none focus:border-primary"
                  >
                    <option value="">성별</option>
                    <option value="여">여</option>
                    <option value="남">남</option>
                  </select>
                </div>
                <select
                  name="program"
                  defaultValue={client.program}
                  className="w-full px-3 py-2 text-sm rounded-[var(--radius-sm)] border border-border-light bg-bg focus:outline-none focus:border-primary"
                >
                  <option value="">프로그램</option>
                  {programs.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
                <textarea
                  name="notes"
                  defaultValue={client.notes}
                  placeholder="메모"
                  rows={2}
                  className="w-full px-3 py-2 text-sm rounded-[var(--radius-sm)] border border-border-light bg-bg focus:outline-none focus:border-primary resize-none"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-primary text-white rounded-[var(--radius-sm)] text-sm font-medium hover:bg-primary-dark transition-colors cursor-pointer"
                >
                  저장
                </button>
              </form>
            ) : (
              <div className="space-y-3 text-sm">
                <InfoRow label="이름" value={client.name} />
                <InfoRow label="연락처" value={client.phone} />
                {client.email && (
                  <InfoRow label="이메일" value={client.email} />
                )}
                {client.birthDate && (
                  <InfoRow
                    label="생년월일"
                    value={client.birthDate}
                  />
                )}
                {client.gender && (
                  <InfoRow label="성별" value={client.gender} />
                )}
                {client.program && (
                  <InfoRow label="프로그램" value={client.program} />
                )}
                <InfoRow
                  label="등록일"
                  value={new Date(
                    client.registeredAt
                  ).toLocaleDateString("ko-KR")}
                />
                {client.notes && (
                  <div className="pt-2 border-t border-border-lighter">
                    <span className="text-text-muted block mb-1">
                      메모
                    </span>
                    <p className="text-text whitespace-pre-wrap">
                      {client.notes}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Delete */}
          <form
            action={deleteClient}
            onSubmit={(e) => {
              if (
                !confirm(
                  `${client.name} 내담자를 정말 삭제하시겠습니까?\n모든 코칭 기록과 검사 결과가 함께 삭제됩니다.`
                )
              ) {
                e.preventDefault();
              }
            }}
          >
            <input type="hidden" name="id" value={client.id} />
            <button
              type="submit"
              className="w-full py-2.5 text-sm text-red-400 hover:text-red-600 hover:bg-red-50 rounded-[var(--radius-sm)] transition-colors cursor-pointer"
            >
              내담자 삭제
            </button>
          </form>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Sessions */}
          <div className="bg-card rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-primary" />
                <h2 className="font-heading text-lg font-bold text-text">
                  코칭 기록
                </h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-bg text-text-muted">
                  {client.sessions.length}회
                </span>
              </div>
              <button
                onClick={() => setShowSessionForm(!showSessionForm)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-[var(--radius-sm)] bg-primary text-white hover:bg-primary-dark transition-colors cursor-pointer"
              >
                {showSessionForm ? (
                  <X size={14} />
                ) : (
                  <Plus size={14} />
                )}
                {showSessionForm ? "취소" : "새 기록"}
              </button>
            </div>

            {showSessionForm && (
              <form
                action={addSession}
                className="mb-5 p-4 bg-bg rounded-[var(--radius-md)] space-y-3"
              >
                <input
                  type="hidden"
                  name="clientId"
                  value={client.id}
                />
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-text-muted mb-1">
                      날짜
                    </label>
                    <input
                      type="date"
                      name="date"
                      defaultValue={today}
                      required
                      className="w-full px-3 py-2 text-sm rounded-[var(--radius-sm)] border border-border-light bg-white focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-text-muted mb-1">
                      소요 시간 (분)
                    </label>
                    <input
                      type="number"
                      name="duration"
                      defaultValue={50}
                      min={10}
                      max={180}
                      className="w-full px-3 py-2 text-sm rounded-[var(--radius-sm)] border border-border-light bg-white focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-text-muted mb-1">
                    코칭 내용
                  </label>
                  <textarea
                    name="content"
                    required
                    rows={3}
                    placeholder="이번 코칭에서 다룬 주요 내용"
                    className="w-full px-3 py-2 text-sm rounded-[var(--radius-sm)] border border-border-light bg-white focus:outline-none focus:border-primary resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-text-muted mb-1">
                    메모
                  </label>
                  <textarea
                    name="notes"
                    rows={2}
                    placeholder="추가 메모 (선택)"
                    className="w-full px-3 py-2 text-sm rounded-[var(--radius-sm)] border border-border-light bg-white focus:outline-none focus:border-primary resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-primary text-white rounded-[var(--radius-sm)] text-sm font-medium hover:bg-primary-dark transition-colors cursor-pointer"
                >
                  {client.sessions.length + 1}회차 기록 저장
                </button>
              </form>
            )}

            {client.sessions.length === 0 ? (
              <p className="text-sm text-text-light text-center py-6">
                아직 코칭 기록이 없습니다
              </p>
            ) : (
              <div className="space-y-2">
                {[...client.sessions].reverse().map((session) => (
                  <div
                    key={session.id}
                    className="border border-border-lighter rounded-[var(--radius-sm)] overflow-hidden"
                  >
                    <button
                      onClick={() =>
                        setExpandedSession(
                          expandedSession === session.id
                            ? null
                            : session.id
                        )
                      }
                      className="w-full flex items-center justify-between p-3.5 hover:bg-bg transition-colors text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-primary-pale flex items-center justify-center text-xs font-bold text-primary shrink-0">
                          {session.sessionNumber}
                        </span>
                        <div>
                          <p className="text-sm font-medium text-text">
                            {session.sessionNumber}회차 코칭
                          </p>
                          <p className="text-xs text-text-light">
                            {session.date} &middot; {session.duration}분
                          </p>
                        </div>
                      </div>
                      {expandedSession === session.id ? (
                        <ChevronDown size={16} className="text-text-light shrink-0" />
                      ) : (
                        <ChevronRight size={16} className="text-text-light shrink-0" />
                      )}
                    </button>

                    {expandedSession === session.id && (
                      <div className="px-3.5 pb-3.5 border-t border-border-lighter">
                        <div className="pt-3">
                          <h4 className="text-xs font-medium text-text-muted mb-1.5">
                            코칭 내용
                          </h4>
                          <p className="text-sm text-text whitespace-pre-wrap">
                            {session.content}
                          </p>
                        </div>
                        {session.notes && (
                          <div className="mt-3">
                            <h4 className="text-xs font-medium text-text-muted mb-1.5">
                              메모
                            </h4>
                            <p className="text-sm text-text whitespace-pre-wrap">
                              {session.notes}
                            </p>
                          </div>
                        )}
                        <form
                          action={deleteSession}
                          className="mt-3 pt-3 border-t border-border-lighter"
                          onSubmit={(e) => {
                            if (
                              !confirm(
                                "이 코칭 기록을 삭제하시겠습니까?"
                              )
                            )
                              e.preventDefault();
                          }}
                        >
                          <input
                            type="hidden"
                            name="clientId"
                            value={client.id}
                          />
                          <input
                            type="hidden"
                            name="sessionId"
                            value={session.id}
                          />
                          <button
                            type="submit"
                            className="text-xs text-red-400 hover:text-red-600 transition-colors cursor-pointer"
                          >
                            기록 삭제
                          </button>
                        </form>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Assessment Curriculum Link */}
          <Link
            href={`/dashboard/clients/${client.id}/assessments`}
            className="flex items-center justify-between p-5 bg-card rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] border border-primary/15 hover:border-primary/40 hover:shadow-[var(--shadow-md)] transition-all group"
          >
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                <ClipboardList size={18} className="text-white" />
              </span>
              <div>
                <h3 className="font-heading font-bold text-text group-hover:text-primary transition-colors">
                  검사 커리큘럼
                </h3>
                <p className="text-xs text-text-muted">
                  5개 검사 진행 &middot; {client.assessments.length}건 완료
                </p>
              </div>
            </div>
            <ChevronRight size={18} className="text-text-light group-hover:text-primary transition-colors" />
          </Link>

          {/* Assessments */}
          <div className="bg-card rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <ClipboardList size={18} className="text-primary" />
                <h2 className="font-heading text-lg font-bold text-text">
                  검사 결과
                </h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-bg text-text-muted">
                  {client.assessments.length}건
                </span>
              </div>
              <button
                onClick={() =>
                  setShowAssessmentForm(!showAssessmentForm)
                }
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-[var(--radius-sm)] bg-primary text-white hover:bg-primary-dark transition-colors cursor-pointer"
              >
                {showAssessmentForm ? (
                  <X size={14} />
                ) : (
                  <Plus size={14} />
                )}
                {showAssessmentForm ? "취소" : "새 검사"}
              </button>
            </div>

            {showAssessmentForm && (
              <form
                action={addAssessment}
                className="mb-5 p-4 bg-bg rounded-[var(--radius-md)] space-y-3"
              >
                <input
                  type="hidden"
                  name="clientId"
                  value={client.id}
                />
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-text-muted mb-1">
                      검사 도구
                    </label>
                    <select
                      name="toolName"
                      required
                      className="w-full px-3 py-2 text-sm rounded-[var(--radius-sm)] border border-border-light bg-white focus:outline-none focus:border-primary"
                    >
                      <option value="">선택</option>
                      {tools.map((t) => (
                        <option key={t.id} value={t.name}>
                          {t.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-text-muted mb-1">
                      검사 날짜
                    </label>
                    <input
                      type="date"
                      name="date"
                      defaultValue={today}
                      required
                      className="w-full px-3 py-2 text-sm rounded-[var(--radius-sm)] border border-border-light bg-white focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-text-muted mb-1">
                    검사 결과
                  </label>
                  <textarea
                    name="result"
                    required
                    rows={4}
                    placeholder="검사 결과를 기록하세요"
                    className="w-full px-3 py-2 text-sm rounded-[var(--radius-sm)] border border-border-light bg-white focus:outline-none focus:border-primary resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-text-muted mb-1">
                    메모
                  </label>
                  <textarea
                    name="notes"
                    rows={2}
                    placeholder="추가 메모 (선택)"
                    className="w-full px-3 py-2 text-sm rounded-[var(--radius-sm)] border border-border-light bg-white focus:outline-none focus:border-primary resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-primary text-white rounded-[var(--radius-sm)] text-sm font-medium hover:bg-primary-dark transition-colors cursor-pointer"
                >
                  검사 결과 저장
                </button>
              </form>
            )}

            {client.assessments.length === 0 ? (
              <p className="text-sm text-text-light text-center py-6">
                아직 검사 기록이 없습니다
              </p>
            ) : (
              <div className="space-y-2">
                {[...client.assessments].reverse().map((assessment) => (
                  <div
                    key={assessment.id}
                    className="border border-border-lighter rounded-[var(--radius-sm)] overflow-hidden"
                  >
                    <button
                      onClick={() =>
                        setExpandedAssessment(
                          expandedAssessment === assessment.id
                            ? null
                            : assessment.id
                        )
                      }
                      className="w-full flex items-center justify-between p-3.5 hover:bg-bg transition-colors text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-bg-warm flex items-center justify-center shrink-0">
                          <FileText
                            size={14}
                            className="text-primary"
                          />
                        </span>
                        <div>
                          <p className="text-sm font-medium text-text">
                            {assessment.toolName}
                          </p>
                          <p className="text-xs text-text-light">
                            {assessment.date}
                          </p>
                        </div>
                      </div>
                      {expandedAssessment === assessment.id ? (
                        <ChevronDown size={16} className="text-text-light shrink-0" />
                      ) : (
                        <ChevronRight size={16} className="text-text-light shrink-0" />
                      )}
                    </button>

                    {expandedAssessment === assessment.id && (
                      <div className="px-3.5 pb-3.5 border-t border-border-lighter">
                        <div className="pt-3">
                          <h4 className="text-xs font-medium text-text-muted mb-1.5">
                            검사 결과
                          </h4>
                          <p className="text-sm text-text whitespace-pre-wrap">
                            {assessment.result}
                          </p>
                        </div>
                        {assessment.notes && (
                          <div className="mt-3">
                            <h4 className="text-xs font-medium text-text-muted mb-1.5">
                              메모
                            </h4>
                            <p className="text-sm text-text whitespace-pre-wrap">
                              {assessment.notes}
                            </p>
                          </div>
                        )}
                        <form
                          action={deleteAssessment}
                          className="mt-3 pt-3 border-t border-border-lighter"
                          onSubmit={(e) => {
                            if (
                              !confirm(
                                "이 검사 기록을 삭제하시겠습니까?"
                              )
                            )
                              e.preventDefault();
                          }}
                        >
                          <input
                            type="hidden"
                            name="clientId"
                            value={client.id}
                          />
                          <input
                            type="hidden"
                            name="assessmentId"
                            value={assessment.id}
                          />
                          <button
                            type="submit"
                            className="text-xs text-red-400 hover:text-red-600 transition-colors cursor-pointer"
                          >
                            기록 삭제
                          </button>
                        </form>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-text-muted">{label}</span>
      <span className="text-text font-medium">{value}</span>
    </div>
  );
}
