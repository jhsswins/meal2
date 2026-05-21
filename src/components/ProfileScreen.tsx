/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from "react";
import { User, Edit, Bell, Shield, HelpCircle, LogOut, Plus, Check } from "lucide-react";
import ToggleSwitch from "./ToggleSwitch";
import SettingRow from "./SettingRow";

export default function ProfileScreen() {
  const [isAllergyAlert, setIsAllergyAlert] = useState<boolean>(true);
  const [isDailyAlert, setIsDailyAlert] = useState<boolean>(true);
  const [allergies, setAllergies] = useState<string[]>(["우유", "땅콩"]);
  const [newAllergy, setNewAllergy] = useState<string>("");
  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);
  const [profileName, setProfileName] = useState<string>("김학생");
  const [profileClass, setProfileClass] = useState<string>("2학년 3반 15번");
  const [showToast, setShowToast] = useState<string | null>(null);

  // Trigger feedback
  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(null), 4000);
  };

  // Profile Save
  const handleSaveProfile = (e: FormEvent) => {
    e.preventDefault();
    setIsEditingProfile(false);
    triggerToast("학적 학생 프로필 정보가 성공적으로 수시 승인 반영되었습니다!");
  };

  // Add customized allergen
  const handleAddAllergen = (e: FormEvent) => {
    e.preventDefault();
    if (newAllergy.trim() && !allergies.includes(newAllergy.trim())) {
      setAllergies((prev) => [...prev, newAllergy.trim()]);
      setNewAllergy("");
      triggerToast("새로운 관심 알레르기 성분이 경보망에 추가되었습니다!");
    }
  };

  return (
    <div className="screen flex flex-col gap-6 animate-fade-in" id="profile-screen-root">
      {/* Title block */}
      <div className="flex flex-col gap-1 border-b border-soft-gray/60 pb-3" id="profile-header-desc">
        <span className="text-secondary/90 font-bold text-xs sm:text-sm tracking-wide uppercase">
          마이페이지
        </span>
        <h2 className="font-bold text-xl sm:text-2xl text-deep-olive flex items-center gap-2" id="profile-main-title">
          <User className="w-5 h-5 text-deep-olive" />
          <span>사용자 계정 정보</span>
        </h2>
      </div>

      {/* Grid Layout: Desktop Side-by-side, Mobile Stacked */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="profile-grid-layout">
        
        {/* Left Card: Student Info & Edit */}
        <div className="flex flex-col gap-4" id="profile-info-column">
          <article 
            className="relative bg-gradient-to-br from-card-white to-sage-green/15 rounded-2xl p-6 shadow-warm-soft border border-soft-gray flex flex-col sm:flex-row items-center gap-5"
            id="student-profile-info-card"
          >
            {/* Edit Indicator top-right */}
            {!isEditingProfile && (
              <button
                onClick={() => setIsEditingProfile(true)}
                id="edit-profile-trigger"
                className="absolute top-4 right-4 text-text-dark/50 hover:text-deep-olive transition-colors cursor-pointer"
                aria-label="프로필 정보 수정"
              >
                <Edit className="w-5 h-5" />
              </button>
            )}

            {/* Avatar block */}
            <div className="w-20 h-20 rounded-full bg-soft-gray border-2 border-card-white shadow-md flex items-center justify-center text-text-dark/40 overflow-hidden flex-shrink-0">
              <div className="w-full h-full bg-gradient-to-tr from-olive-green/40 to-sage-green/20 flex items-center justify-center">
                <User className="w-9 h-9 text-deep-olive/80" />
              </div>
            </div>

            {/* Name/Academic class indicators */}
            <div className="flex flex-col text-center sm:text-left flex-1">
              {isEditingProfile ? (
                <form onSubmit={handleSaveProfile} className="flex flex-col gap-2 w-full">
                  <input
                    type="text"
                    required
                    maxLength={10}
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="bg-card-white border border-soft-gray rounded-lg px-2 py-1 text-sm text-text-dark font-bold focus:outline-deep-olive"
                  />
                  <input
                    type="text"
                    required
                    maxLength={20}
                    value={profileClass}
                    onChange={(e) => setProfileClass(e.target.value)}
                    className="bg-card-white border border-soft-gray rounded-lg px-2 py-1 text-xs text-text-dark/70 focus:outline-deep-olive"
                  />
                  <button
                    type="submit"
                    className="bg-deep-olive text-card-white font-semibold text-xs py-1 px-3 rounded-lg hover:bg-lime-850 self-start cursor-pointer mt-1"
                  >
                    확인
                  </button>
                </form>
              ) : (
                <>
                  <h3 className="font-bold text-lg md:text-xl text-text-dark">
                    {profileName}
                  </h3>
                  <p className="text-sm text-text-dark/60 mt-1">
                    씨마스고등학교
                  </p>
                  <p className="text-xs bg-sage-green/30 text-deep-olive font-bold px-2 py-0.5 rounded-full inline-block mt-1.5 self-center sm:self-start">
                    {profileClass}
                  </p>
                </>
              )}
            </div>
          </article>

          {/* Quick Stats Grid item */}
          <div className="bg-card-white rounded-xl p-4.5 border border-soft-gray shadow-xs text-text-dark/80 text-xs flex flex-col gap-2" id="app-version-panel">
            <div className="flex justify-between border-b border-soft-gray/60 pb-2">
              <span className="font-semibold text-text-dark/60">마일리지 포인트</span>
              <span className="font-bold text-deep-olive">1,620 P</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-text-dark/60">이번 주 급식 완식일수</span>
              <span className="font-bold text-deep-olive">4회 완료</span>
            </div>
          </div>
        </div>

        {/* Right Column: Settings, Alerts, Links */}
        <div className="flex flex-col gap-4" id="profile-settings-column">
          
          {/* A. Allergy Alarm Setting Panel */}
          <div className="bg-card-white rounded-2xl p-5 border border-soft-gray shadow-warm-soft flex flex-col gap-4" id="allergy-settings-box">
            <div className="flex justify-between items-start gap-4">
              <div className="flex flex-col">
                <h4 className="font-bold text-sm text-text-dark">알레르기 경고 알림</h4>
                <p className="text-xs text-text-dark/60 mt-0.5">식단에 등록된 알레르기 유발 물질 포함 시 스마트 경보 수신</p>
              </div>
              <ToggleSwitch
                checked={isAllergyAlert}
                onChange={(enabled) => {
                  setIsAllergyAlert(enabled);
                  triggerToast(enabled ? "알레르기 실시간 알림이 활성화되었습니다." : "알레르기 실시간 알림이 차단되었습니다.");
                }}
                id="toggle-allergy-alert"
              />
            </div>

            {/* Active allergens list with additions */}
            <div className="flex flex-col gap-2 mt-1">
              <span className="text-xs font-bold text-text-dark/50">등록 성분 :</span>
              <div className="flex flex-wrap gap-1.5 items-center">
                {allergies.map((allergy) => (
                  <span 
                    key={allergy}
                    className="inline-flex items-center gap-1.5 bg-[#FAF7EF] px-2.5 py-1 rounded-full text-xs font-semibold text-[#8A3F1F] border border-warm-peach/60"
                  >
                    <span>{allergy}</span>
                    <button 
                      onClick={() => {
                        setAllergies(prev => prev.filter(x => x !== allergy));
                        triggerToast(`${allergy} 필터가 삭제되었습니다.`);
                      }}
                      className="text-[#8A3F1F]/60 hover:text-[#8A3F1F] font-bold cursor-pointer text-[10px]"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              {/* Add custom allergen form */}
              <form onSubmit={handleAddAllergen} className="flex gap-2 mt-2">
                <input
                  type="text"
                  placeholder="예: 조개류, 토마토"
                  maxLength={10}
                  value={newAllergy}
                  onChange={(e) => setNewAllergy(e.target.value)}
                  className="bg-card-white border border-soft-gray rounded-lg px-2.5 py-1 text-xs text-text-dark/90 flex-1 focus:outline-deep-olive"
                />
                <button
                  type="submit"
                  className="bg-soft-gray hover:bg-soft-gray/80 text-text-dark font-bold text-xs px-3.5 py-1 rounded-lg cursor-pointer flex items-center gap-1 shrink-0"
                >
                  <Plus className="w-3 h-3" />
                  <span>추가</span>
                </button>
              </form>
            </div>
          </div>

          {/* B. Daily Alert Toggle Box */}
          <div className="bg-card-white rounded-2xl p-5 border border-soft-gray shadow-warm-soft flex justify-between items-center gap-4" id="daily-settings-box">
            <div className="flex flex-col">
              <h4 className="font-bold text-sm text-text-dark font-sans">일일 식단 알림</h4>
              <p className="text-xs text-text-dark/60 mt-0.5">매일 아침 8시에 오늘의 메뉴와 원산지 알림</p>
            </div>
            <ToggleSwitch
              checked={isDailyAlert}
              onChange={(enabled) => {
                setIsDailyAlert(enabled);
                triggerToast(enabled ? "아침 식단 매일 뉴스레터 알림 수신 동의 처리되었습니다." : "아침 식단 정기 알림이 꺼졌습니다.");
              }}
              id="toggle-daily-alert"
            />
          </div>

          {/* C. Helpful Links Section */}
          <div className="bg-card-white rounded-2xl border border-soft-gray shadow-warm-soft overflow-hidden" id="profile-links-group">
            <SettingRow
              id="link-customer-service"
              title="고객센터 / 문의하기"
              onClick={() => {
                triggerToast("급식실 급식 운영위원회 건의 게시판으로 즉시 연결 예정입니다.");
              }}
            />
            <SettingRow
              id="link-terms"
              title="이용약관"
              onClick={() => {
                triggerToast("서비스 개인정보 처리방침 규약에 대한 전문 동의 이력 검토 중입니다.");
              }}
            />
          </div>

          {/* D. Red Outfitted Logout */}
          <button
            onClick={() => {
              triggerToast("교원 연수 시뮬레이터를 통해 모의 로그아웃이 수행되었습니다.");
            }}
            id="profile-logout-button"
            className="w-full bg-card-white text-center py-3.5 border border-soft-gray rounded-2xl shadow-sm font-semibold text-error hover:bg-error/5 active:scale-95 transition-all text-sm cursor-pointer inline-flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4 text-error" />
            <span>로그아웃</span>
          </button>

        </div>
      </div>

      {/* Floating feedback toast */}
      {showToast && (
        <div 
          className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-[#2A241A] text-card-white px-5 py-3 rounded-xl shadow-lg text-xs font-bold leading-relaxed z-50 animate-fade-in flex items-center gap-2"
          id="profile-toast-box"
        >
          <Check className="w-4 h-4 text-sage-green" />
          <span>{showToast}</span>
        </div>
      )}

      {/* Persistent Footer */}
      <footer className="mt-6 border-t border-soft-gray/60 pt-6 pb-2 text-center text-xs text-text-dark/50 leading-relaxed" id="profile-school-footer">
        <p className="font-bold">© 2024 씨마스고등학교 급식</p>
        <p className="mt-1 font-medium font-sans">건강하고 안전하고 맛있는 학교 식단 서비스를 지원합니다.</p>
        <p className="mt-1 font-mono text-[10px]">App Version v1.2.0 (Teacher Training Build)</p>
      </footer>
    </div>
  );
}
