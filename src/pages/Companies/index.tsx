import * as S from "./styles";
import { Loading } from "../../hooks";
import Box from "../../components/Box";
import { Companies } from "../../services";
import { useEffect, useState } from "react";
import { ICompany } from "../../types/companies";
import { PlusCircle } from "@phosphor-icons/react";
import {
  Alert,
  Button,
  Form,
  Input,
  Modal,
  notification,
  Skeleton,
} from "antd";

export function PageCompanies() {
  const [companies, setCompanies] = useState<ICompany[]>([]);

  const [search, setSearch] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { hideLoading, showLoading, isLoading } = Loading.useLoading();
  const [api, contextHolder] = notification.useNotification();

  const openErrorNotification = () => {
    api.error({
      message: "Error when creating a new company, please try again!",
    });
  };

  useEffect(() => {
    getAllCompanies();
  }, []);

  const getAllCompanies = async () => {
    showLoading();
    try {
      const allCompanies = await Companies.getAllCompanies();

      setCompanies(allCompanies);
    } catch (error) {
      return (
        <Alert
          message="Error"
          description="There was an error getting the companies, please try again!"
          type="error"
          showIcon
        />
      );
    } finally {
      hideLoading();
    }
  };

  const handleSubmitCompany = async (values: any) => {
    showLoading();
    try {
      const companyCreated = await Companies.createCompany(values);

      setCompanies([...companies, companyCreated]);
    } catch (error) {
      openErrorNotification();
    } finally {
      hideLoading();
      setIsModalOpen(false);
    }
  };

  const filteredCompanies = companies.filter((company) => {
    if (company.name.toLowerCase().includes(search.toLowerCase())) return true;

    return false;
  });

  return (
    <S.HomeContainer>
      {contextHolder}
      <S.Content>
        <Box>
          <Skeleton loading={isLoading}>
            <S.HistoryContainer>
              <S.Header>
                <h1>Companies</h1>

                <S.AntDesignButton
                  type="primary"
                  onClick={() => setIsModalOpen(!isModalOpen)}
                  icon={<PlusCircle size={24} />}
                >
                  New company
                </S.AntDesignButton>
              </S.Header>

              <S.HistoryList>
                <Input
                  placeholder="Search by company"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredCompanies.map((company) => (
                      <tr key={company.id}>
                        <td>{company.id}</td>
                        <td>{company.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </S.HistoryList>
            </S.HistoryContainer>
          </Skeleton>
        </Box>
      </S.Content>

      <Modal
        title="Add new company"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[]}
      >
        <Form
          onFinish={handleSubmitCompany}
          layout="vertical"
          style={{ marginTop: "2rem" }}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please input company name!" }]}
            label="Company Name"
          >
            <Input />
          </Form.Item>
          <Form.Item
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            <Button type="default" htmlType="submit" loading={isLoading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </S.HomeContainer>
  );
}
