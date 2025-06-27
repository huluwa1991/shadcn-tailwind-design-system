import { useState, useCallback } from 'react';
import type { 
  ResumeData, 
  ResumeListKey, 
  ResumeListItem,
  BasicInfo,
  InterestSkill,
  WorkSkill
} from '../types';
import { createNewItem, initialResumeData } from '../types';
import type { CitySelectValue } from '../../../components/ui/data-entry/city-select';

export const useResumeData = (initialData: ResumeData = initialResumeData) => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialData);
  const [newlyAddedIds, setNewlyAddedIds] = useState<Set<string>>(new Set());
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());

  // 基本信息更新
  const updateBasicInfo = useCallback((field: keyof BasicInfo, value: string | CitySelectValue) => {
    setResumeData(prev => ({
      ...prev,
      basicInfo: {
        ...prev.basicInfo,
        [field]: value
      }
    }));
  }, []);

  // 兴趣与技能更新
  const updateInterestSkill = useCallback((field: keyof InterestSkill, value: string[]) => {
    setResumeData(prev => ({
      ...prev,
      interestSkill: {
        ...prev.interestSkill,
        [field]: value
      }
    }));
  }, []);

  // 工作技能更新
  const updateWorkSkill = useCallback((field: keyof WorkSkill, value: string | string[]) => {
    setResumeData(prev => ({
      ...prev,
      workSkill: {
        ...prev.workSkill,
        [field]: value
      }
    }));
  }, []);

  // 自我评价更新
  const updateSelfEvaluation = useCallback((value: string) => {
    setResumeData(prev => ({
      ...prev,
      selfEvaluation: value
    }));
  }, []);

  // 通用的列表项添加 - 添加到顶部并支持动画
  const addItem = useCallback((listKey: ResumeListKey, itemType: keyof typeof createNewItem) => {
    const newItem = createNewItem[itemType]();
    const newId = newItem.id;
    
    // 标记为新添加的项目，用于触发动画
    setNewlyAddedIds(prev => new Set([...prev, newId]));
    
    setResumeData(prev => ({
      ...prev,
      [listKey]: [newItem, ...prev[listKey]] // 添加到顶部
    }));
    
    // 1秒后移除新添加的标记
    setTimeout(() => {
      setNewlyAddedIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(newId);
        return newSet;
      });
    }, 1000);
  }, []);

  // 通用的列表项更新
  const updateItem = useCallback((
    listKey: ResumeListKey, 
    id: string, 
    field: string, 
    value: any
  ) => {
    setResumeData(prev => ({
      ...prev,
      [listKey]: prev[listKey].map((item: ResumeListItem) => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  }, []);

  // 通用的列表项删除 - 支持动画
  const removeItem = useCallback((listKey: ResumeListKey, id: string) => {
    // 标记为正在删除的项目，用于触发退出动画
    setDeletingIds(prev => new Set([...prev, id]));
    
    // 300ms后真正删除项目
    setTimeout(() => {
      setResumeData(prev => ({
        ...prev,
        [listKey]: prev[listKey].filter((item: ResumeListItem) => item.id !== id)
      }));
      
      // 清除删除标记
      setDeletingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }, 300);
  }, []);

  // 检查列表项是否有内容的通用函数
  const hasItemContent = useCallback((item: ResumeListItem): boolean => {
    // 递归检查对象的所有属性是否为空
    const checkValue = (value: any): boolean => {
      if (value === null || value === undefined || value === '') {
        return false;
      }
      if (Array.isArray(value)) {
        return value.length > 0 && value.some(checkValue);
      }
      if (typeof value === 'object') {
        return Object.values(value).some(checkValue);
      }
      if (typeof value === 'number') {
        return value > 0; // 对于 authorRank 等数字字段
      }
      return true;
    };

    // 排除 id 字段，检查其他字段
    const { id, ...otherFields } = item;
    return Object.values(otherFields).some(checkValue);
  }, []);

  // 保存简历数据
  const saveResumeData = useCallback(() => {
    console.log('保存简历:', resumeData);
    // 这里可以添加实际的保存逻辑
    return resumeData;
  }, [resumeData]);

  // 重置简历数据
  const resetResumeData = useCallback(() => {
    setResumeData(initialResumeData);
    setNewlyAddedIds(new Set());
    setDeletingIds(new Set());
  }, []);

  // 批量更新简历数据
  const updateResumeData = useCallback((newData: Partial<ResumeData>) => {
    setResumeData(prev => ({
      ...prev,
      ...newData
    }));
  }, []);

  return {
    // 数据
    resumeData,
    
    // 动画状态
    newlyAddedIds,
    deletingIds,
    
    // 基础操作
    updateBasicInfo,
    updateInterestSkill,
    updateWorkSkill,
    updateSelfEvaluation,
    
    // 列表操作
    addItem,
    updateItem,
    removeItem,
    hasItemContent,
    
    // 全局操作
    saveResumeData,
    resetResumeData,
    updateResumeData,
    setResumeData
  };
}; 