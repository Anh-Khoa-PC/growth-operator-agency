import { queryClient } from '@/main';
import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode
} from 'react';
import type { FilterState, ID } from '../constants';

interface UserAccountPageContextProps {
    filter: FilterState;
    changeFilter: (newState: FilterState) => void;
    selectedItemId?: ID;
    onSelectItemId: (id?: ID) => void;
}

export const initialValues = {
    filter: {},
    changeFilter: () => { },
    isFiltering: false,
    changeFilterState: () => { },
    onSelectItemId: () => { }
};

const UserAccountPageContext =
    createContext<UserAccountPageContextProps>(initialValues);

export const useUserAccountPage = () => useContext(UserAccountPageContext);

export const UserAccountPageProvider = ({ children }: { children: ReactNode }) => {
    const [state, setState] = useState<FilterState>(initialValues.filter);

    useEffect(() => {
        queryClient.refetchQueries({
            queryKey: ['user-accounts']
        });
    }, [JSON.stringify(state)]);

    const [selectedItemId, setSelectedItemId] = useState<ID>();
    const onSelectItemId = (id?: ID) => {
        setSelectedItemId(id);
    }

    return (
        <UserAccountPageContext.Provider
            value={{
                filter: { ...state },
                changeFilter: (newState: FilterState) => {
                    // console.log("Changing filter state:", newState);
                    if (JSON.stringify(newState) === JSON.stringify(state)) {
                        return;
                    }
                    setState({ ...newState });
                },
                selectedItemId,
                onSelectItemId
            }}
        >
            {children}
        </UserAccountPageContext.Provider>
    );
};
