import React, { useEffect, useMemo, useState } from 'react';
import { Table, Input, Button } from 'react-n-design';
import styled from 'styled-components';

interface PropsTableProps {
  componentName: string;
}

interface PropRow {
  name: string;
  type: string;
  defaultValue?: string | null;
  required?: boolean;
  description?: string;
}

const TableWrapper = styled.div`
  margin-top: 16px;
  width: 100%;
`;

const TableScrollContainer = styled.div`
  overflow-x: auto;
  width: 100%;
  max-width: 100%;

  /* Ensure table doesn't get squished */
  table {
    min-width: 700px;
    width: 100%;
  }

  /* Column width hints via th:first-child etc not reliable in all tables;
     apply via colgroup-style widths using nth-child on th cells */
  th:nth-child(1),
  td:nth-child(1) {
    width: auto;
    white-space: nowrap;
  }
  th:nth-child(2),
  td:nth-child(2) {
    min-width: 180px;
  }
  th:nth-child(3),
  td:nth-child(3) {
    min-width: 100px;
    white-space: nowrap;
  }
  th:nth-child(4),
  td:nth-child(4) {
    min-width: 80px;
    white-space: nowrap;
  }
  th:nth-child(5),
  td:nth-child(5) {
    min-width: 250px;
  }
`;

const SectionTitle = styled.h2`
  margin: 0 0 16px;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.text};
`;

const SearchRow = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  align-items: center;
  width: 100%;

  > *:first-child {
    flex: 1 1 auto;
    min-width: 0;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const TypeBadge = styled.span<{ $type: string }>`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-family: 'SFMono-Regular', Consolas, Menlo, monospace;
  font-weight: 500;
  line-height: 1.4;
  background: ${({ $type, theme }) => {
    const t = $type.toLowerCase();
    if (t.includes('boolean')) return `${theme.colors.success}18`;
    if (t.includes('string')) return `${theme.colors.primary}18`;
    if (t.includes('number')) return '#faad1418';
    if (t.includes('function') || t.includes('=>')) return `${theme.colors.error}18`;
    if (t.includes('reactnode') || t.includes('element')) return '#722ed118';
    if (t.includes('enum') || t.includes('literal')) return '#13c2c218';
    return theme.colors.hoverBg;
  }};
  color: ${({ $type, theme }) => {
    const t = $type.toLowerCase();
    if (t.includes('boolean')) return theme.colors.success;
    if (t.includes('string')) return theme.colors.primary;
    if (t.includes('number')) return '#faad14';
    if (t.includes('function') || t.includes('=>')) return theme.colors.error;
    if (t.includes('reactnode') || t.includes('element')) return '#722ed1';
    if (t.includes('enum') || t.includes('literal')) return '#13c2c2';
    return theme.colors.textSecondary;
  }};
`;

const RequiredBadge = styled.span<{ $required?: boolean }>`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1.4;
  background: ${({ $required, theme }) =>
    $required ? (theme.colors.error ? `${theme.colors.error}18` : '#ff4d4f18') : (theme.colors.success ? `${theme.colors.success}18` : '#52c41a18')};
  color: ${({ $required, theme }) =>
    $required ? (theme.colors.error || '#ff4d4f') : (theme.colors.success || '#52c41a')};
`;

const PlaceholderNote = styled.div`
  padding: 24px;
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;
`;

const PlaceholderActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 12px;
`;

const REPO_URL = 'https://github.com/SoumyoNawab8/react-n-design';

const PropsTable: React.FC<PropsTableProps> = ({ componentName }) => {
  const [propsData, setPropsData] = useState<PropRow[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setQuery('');

    import('../data/componentProps.json')
      .then((mod) => {
        if (cancelled) return;
        const json: Record<string, PropRow[]> = (mod.default || mod) as Record<string, PropRow[]>;
        const rows: PropRow[] | undefined = json[componentName];
        setPropsData(rows ?? null);
      })
      .catch(() => {
        if (cancelled) return;
        setPropsData(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [componentName]);

  const filtered = useMemo(() => {
    if (!propsData) return [];
    if (!query.trim()) return propsData;
    const q = query.toLowerCase();
    return propsData.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q) ||
        (p.description || '').toLowerCase().includes(q)
    );
  }, [propsData, query]);

  const sourceUrl = `${REPO_URL}/blob/master/src/components/${componentName}/${componentName}.tsx`;

  if (loading) {
    return (
      <TableWrapper>
        <SectionTitle>API</SectionTitle>
        <p>Loading props…</p>
      </TableWrapper>
    );
  }

  if (!propsData) {
    return (
      <TableWrapper>
        <SectionTitle>API</SectionTitle>
        <PlaceholderNote>
          <p style={{ margin: 0 }}>
            Props documentation is not available for <strong>{componentName}</strong>.
          </p>
          <PlaceholderActions>
            <Button size="small" variant="ghost" onClick={() => window.open(sourceUrl, '_blank', 'noopener,noreferrer')}>
              View Source on GitHub
            </Button>
          </PlaceholderActions>
        </PlaceholderNote>
      </TableWrapper>
    );
  }

  return (
    <TableWrapper>
      <SectionTitle>API</SectionTitle>
      <SearchRow>
        <Input
          placeholder="Search props…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          fullWidth
        />
        <Button size="small" variant="ghost" onClick={() => setQuery('')} disabled={!query}>
          Clear
        </Button>
      </SearchRow>
      <TableScrollContainer>
        <Table<PropRow>
          columns={[
          {
            key: 'name',
            title: 'Name',
            dataIndex: 'name',
            render: (value) => <code style={{ fontWeight: 600 }}>{value}</code>,
          },
          {
            key: 'type',
            title: 'Type',
            dataIndex: 'type',
            render: (value: string) => <TypeBadge $type={value}>{value}</TypeBadge>,
          },
          {
            key: 'defaultValue',
            title: 'Default',
            dataIndex: 'defaultValue',
            render: (value) =>
              value != null ? (
                <code style={{ fontSize: '0.8125rem' }}>{String(value)}</code>
              ) : (
                <span style={{ color: 'var(--colors-text-secondary)', fontSize: '0.8125rem' }}>—</span>
              ),
          },
          {
            key: 'required',
            title: 'Required',
            dataIndex: 'required',
            render: (value: boolean) => (
              <RequiredBadge $required={value}>{value ? 'Yes' : 'No'}</RequiredBadge>
            ),
          },
          {
            key: 'description',
            title: 'Description',
            dataIndex: 'description',
            render: (value) => (
              <span style={{ fontSize: '0.875rem', color: 'var(--colors-text-secondary)' }}>
                {value || '—'}
              </span>
            ),
          },
        ]}
        dataSource={filtered}
        pagination={false}
        emptyTitle="No matching props"
        emptyDescription={`No props match '${query}'. Try a different search.`}
        />
      </TableScrollContainer>
    </TableWrapper>
  );
};

export default PropsTable;
