
package co.usa.ciclo3.ciclo3.Service;

import co.usa.ciclo3.ciclo3.Modelo.Admin;
import co.usa.ciclo3.ciclo3.Repository.crud.AdminRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {
    @Autowired
    private AdminRepository repository;
    
    public List<Admin> getAll() {
        return repository.getAll();
    }
    
    public Optional<Admin> getAdmin(int id) {
        return repository.getAdmin(id);
    }
    
    public Admin save(Admin admin) {
        if(admin.getIdAdmin() == null) {
            return repository.save(admin);
        } else {
            return admin;
        }
    }
}
